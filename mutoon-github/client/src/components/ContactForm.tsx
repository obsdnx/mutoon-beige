import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("individual");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, type, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setType("individual");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send message");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-8">
        <p className="font-display text-lg text-foreground mb-2">Message Sent</p>
        <p className="text-muted-foreground text-sm leading-relaxed">
          We have received your inquiry and will respond shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-accent text-sm hover:underline focus-ring"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Name</label>
          <Input
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="bg-background border-border focus:border-accent focus-accessible"
            data-testid="input-name"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Email</label>
          <Input
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-background border-border focus:border-accent focus-accessible"
            data-testid="input-email"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">I am representing</label>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger
            className="bg-background border-border focus:border-accent focus-accessible"
            data-testid="select-type"
          >
            <SelectValue placeholder="Select one" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="individual">Myself (Individual)</SelectItem>
            <SelectItem value="institution">An Institution / Mosque</SelectItem>
            <SelectItem value="bookstore">Bookstore / Retailer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Message</label>
        <Textarea
          placeholder="How can we help you?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="bg-background border-border focus:border-accent min-h-[140px] resize-none focus-accessible"
          data-testid="input-message"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-destructive" role="alert">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-accent text-accent-foreground font-medium py-3 px-6 hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 focus-ring tracking-wide"
        data-testid="button-submit"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Sending...
          </>
        ) : (
          <>
            Send Message
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
