import { RepliesInbox } from "@/components/replies/inbox"

export default function RepliesPage() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Replies Inbox</h1>
          <p className="text-muted-foreground">Manage and respond to email replies with AI assistance</p>
        </div>
      </div>

      <RepliesInbox />
    </div>
  )
}
