/**
 * Minimal in-memory stand-in for the slice of the Supabase JS client that
 * lib/sync/pull.ts and lib/sync/push.ts actually use (select/eq/order/
 * maybeSingle, upsert, insert). Not a general Supabase mock -- just enough
 * to unit-test the sync lifecycle without a real network/database.
 */
type Row = Record<string, unknown>;

let idCounter = 0;
function nextId(): string {
  idCounter += 1;
  return `fake-id-${idCounter}`;
}

class FakeQuery {
  private filters: Record<string, unknown> = {};
  private orderBy?: { column: string; ascending: boolean };
  private single = false;

  constructor(private rows: Row[]) {}

  eq(column: string, value: unknown) {
    this.filters[column] = value;
    return this;
  }

  order(column: string, opts: { ascending: boolean }) {
    this.orderBy = { column, ascending: opts.ascending };
    return this;
  }

  maybeSingle() {
    this.single = true;
    return this;
  }

  private resolve() {
    let result = this.rows.filter((row) =>
      Object.entries(this.filters).every(([key, value]) => row[key] === value),
    );
    if (this.orderBy) {
      const { column, ascending } = this.orderBy;
      result = [...result].sort((a, b) => {
        const av = String(a[column]);
        const bv = String(b[column]);
        if (av === bv) return 0;
        return (av < bv ? -1 : 1) * (ascending ? 1 : -1);
      });
    }
    const data = this.single ? (result[0] ?? null) : result;
    return { data, error: null as null };
  }

  then<T1, T2>(
    onfulfilled?: ((value: { data: Row[] | Row | null; error: null }) => T1) | null,
    onrejected?: (reason: unknown) => T2,
  ) {
    return Promise.resolve(this.resolve()).then(onfulfilled, onrejected);
  }
}

export class FakeSupabase {
  tables: Record<string, Row[]> = {};

  private rowsFor(table: string): Row[] {
    return (this.tables[table] ??= []);
  }

  from(table: string) {
    const rows = this.rowsFor(table);
    return {
      select: () => new FakeQuery(rows),
      upsert: (payload: Row | Row[], opts: { onConflict: string; ignoreDuplicates?: boolean }) => {
        const items = Array.isArray(payload) ? payload : [payload];
        const conflictCols = opts.onConflict.split(",");
        for (const item of items) {
          const idx = rows.findIndex((row) => conflictCols.every((c) => row[c] === item[c]));
          if (idx === -1) {
            // INSERT path: mimics column DEFAULTs applying only when the
            // app doesn't supply a value.
            rows.push({
              id: nextId(),
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              ...item,
            });
          } else if (!opts.ignoreDuplicates) {
            // UPDATE (ON CONFLICT DO UPDATE) path: real Postgres only
            // touches the columns actually present in the payload --
            // deliberately does NOT force-refresh updated_at here, since a
            // real app must explicitly include it to bump it. An earlier
            // version of this fake always stamped a fresh updated_at on
            // every upsert regardless of payload, which masked a real bug
            // where lib/sync/push.ts's profile upsert omitted updated_at.
            rows[idx] = { ...rows[idx], ...item };
          }
        }
        return Promise.resolve({ error: null });
      },
      insert: (payload: Row[]) => {
        for (const item of payload) {
          rows.push({ id: nextId(), created_at: new Date().toISOString(), ...item });
        }
        return Promise.resolve({ error: null });
      },
    };
  }
}
