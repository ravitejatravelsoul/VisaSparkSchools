import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { UpdatePasswordForm } from "@/components/auth/update-password-form";

const push = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

const updateUser = vi.fn();
const signOut = vi.fn();
vi.mock("@/lib/supabase/browser", () => ({
  getSupabaseBrowserClient: () => ({
    auth: {
      updateUser: (...args: unknown[]) => updateUser(...args),
      signOut: (...args: unknown[]) => signOut(...args),
    },
  }),
}));

beforeEach(() => {
  push.mockClear();
  updateUser.mockReset();
  signOut.mockReset();
});

function fillAndSubmit(password: string, confirmPassword: string) {
  fireEvent.change(screen.getByLabelText("New password"), { target: { value: password } });
  fireEvent.change(screen.getByLabelText("Confirm new password"), {
    target: { value: confirmPassword },
  });
  fireEvent.click(screen.getByRole("button", { name: "Update password" }));
}

describe("UpdatePasswordForm", () => {
  it("blocks submission and shows an error summary for an empty password", async () => {
    render(<UpdatePasswordForm />);
    fireEvent.click(screen.getByRole("button", { name: "Update password" }));

    expect(await screen.findByText(/please fix the following/i)).toBeInTheDocument();
    // Appears twice by design: once in the error summary list, once as the
    // specific field's own inline error (matching sign-up-form.tsx's
    // established pattern) -- getAllByText proves both, rather than picking
    // one arbitrarily.
    expect(screen.getAllByText("Password must be at least 8 characters.")).toHaveLength(2);
    expect(updateUser).not.toHaveBeenCalled();
  });

  it("rejects a password shorter than the existing 8-character policy", async () => {
    render(<UpdatePasswordForm />);
    fillAndSubmit("short1", "short1");

    await waitFor(() =>
      expect(screen.getAllByText("Password must be at least 8 characters.")).toHaveLength(2),
    );
    expect(updateUser).not.toHaveBeenCalled();
  });

  it("rejects a mismatched confirmation", async () => {
    render(<UpdatePasswordForm />);
    fillAndSubmit("correct-horse-1", "different-horse-1");

    await waitFor(() => expect(screen.getAllByText("Passwords don't match.")).toHaveLength(2));
    expect(updateUser).not.toHaveBeenCalled();
  });

  it("calls updateUser({ password }) exactly once for a valid, matching password", async () => {
    updateUser.mockResolvedValue({ error: null });
    signOut.mockResolvedValue({ error: null });
    render(<UpdatePasswordForm />);

    fillAndSubmit("correct-horse-1", "correct-horse-1");

    await waitFor(() => expect(updateUser).toHaveBeenCalledTimes(1));
    expect(updateUser).toHaveBeenCalledWith({ password: "correct-horse-1" });
  });

  it("never sends the old password -- no such field exists on the form", () => {
    render(<UpdatePasswordForm />);
    expect(screen.queryByLabelText(/current password|old password/i)).not.toBeInTheDocument();
  });

  it("prevents duplicate submission while a request is in flight", async () => {
    let resolveUpdate: (v: unknown) => void = () => {};
    updateUser.mockReturnValue(
      new Promise((resolve) => {
        resolveUpdate = resolve;
      }),
    );
    render(<UpdatePasswordForm />);
    fireEvent.change(screen.getByLabelText("New password"), {
      target: { value: "correct-horse-1" },
    });
    fireEvent.change(screen.getByLabelText("Confirm new password"), {
      target: { value: "correct-horse-1" },
    });

    const button = screen.getByRole("button", { name: "Update password" });
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    resolveUpdate({ error: null });
    await waitFor(() => expect(updateUser).toHaveBeenCalledTimes(1));
  });

  it("shows Supabase's error message on a failed password update, and does not redirect", async () => {
    updateUser.mockResolvedValue({ error: { message: "Session expired. Request a new link." } });
    render(<UpdatePasswordForm />);

    fillAndSubmit("correct-horse-1", "correct-horse-1");

    expect(await screen.findByText("Session expired. Request a new link.")).toBeInTheDocument();
    expect(push).not.toHaveBeenCalled();
    expect(signOut).not.toHaveBeenCalled();
  });

  it("ends the recovery session and redirects to sign-in with a success flag after a successful update", async () => {
    updateUser.mockResolvedValue({ error: null });
    signOut.mockResolvedValue({ error: null });
    render(<UpdatePasswordForm />);

    fillAndSubmit("correct-horse-1", "correct-horse-1");

    await waitFor(() => expect(signOut).toHaveBeenCalledTimes(1));
    expect(push).toHaveBeenCalledWith("/sign-in?passwordUpdated=success");
  });

  it("still reports success and redirects even if the post-success signOut cleanup itself fails", async () => {
    updateUser.mockResolvedValue({ error: null });
    signOut.mockRejectedValue(new Error("network hiccup"));
    render(<UpdatePasswordForm />);

    fillAndSubmit("correct-horse-1", "correct-horse-1");

    await waitFor(() => expect(push).toHaveBeenCalledWith("/sign-in?passwordUpdated=success"));
    // Never told the user the password update itself failed.
    expect(screen.queryByText(/couldn.?t|fail/i)).not.toBeInTheDocument();
  });

  it("focuses the error summary and announces it for assistive tech on validation failure", async () => {
    render(<UpdatePasswordForm />);
    fireEvent.click(screen.getByRole("button", { name: "Update password" }));

    const summary = await screen.findByRole("alert");
    expect(summary).toHaveTextContent(/please fix the following/i);
    await waitFor(() => expect(summary).toHaveFocus());
  });

  it("submits via Enter/keyboard form submission, not only a pointer click", async () => {
    updateUser.mockResolvedValue({ error: null });
    signOut.mockResolvedValue({ error: null });
    render(<UpdatePasswordForm />);

    fireEvent.change(screen.getByLabelText("New password"), {
      target: { value: "correct-horse-1" },
    });
    fireEvent.change(screen.getByLabelText("Confirm new password"), {
      target: { value: "correct-horse-1" },
    });
    fireEvent.submit(screen.getByRole("button", { name: "Update password" }).closest("form")!);

    await waitFor(() => expect(updateUser).toHaveBeenCalledTimes(1));
  });

  it("never logs the password, a token, or a recovery code to the console", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    updateUser.mockResolvedValue({ error: null });
    signOut.mockResolvedValue({ error: null });
    render(<UpdatePasswordForm />);

    fillAndSubmit("correct-horse-1", "correct-horse-1");
    await waitFor(() => expect(push).toHaveBeenCalled());

    const allLoggedText = [...logSpy.mock.calls, ...errorSpy.mock.calls].flat().join(" ");
    expect(allLoggedText).not.toContain("correct-horse-1");
    logSpy.mockRestore();
    errorSpy.mockRestore();
  });

  it("show/hide password toggle reveals and re-hides both password fields together", () => {
    render(<UpdatePasswordForm />);
    const passwordInput = screen.getByLabelText("New password");
    const confirmInput = screen.getByLabelText("Confirm new password");
    expect(passwordInput).toHaveAttribute("type", "password");
    expect(confirmInput).toHaveAttribute("type", "password");

    fireEvent.click(screen.getByRole("button", { name: "Show password" }));
    expect(passwordInput).toHaveAttribute("type", "text");
    expect(confirmInput).toHaveAttribute("type", "text");

    fireEvent.click(screen.getByRole("button", { name: "Hide password" }));
    expect(passwordInput).toHaveAttribute("type", "password");
    expect(confirmInput).toHaveAttribute("type", "password");
  });
});
