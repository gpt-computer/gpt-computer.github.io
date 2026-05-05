import { useState } from "react"
import { MessageCircle, Hash } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface DiscordMember {
  username: string
  avatar: string
  status: "online" | "idle" | "dnd" | "offline"
}

export function DiscordWidget() {
  const [members] = useState<DiscordMember[]>([
    { username: "User1", avatar: "", status: "online" },
    { username: "User2", avatar: "", status: "online" },
    { username: "User3", avatar: "", status: "idle" },
  ])
  const [onlineCount] = useState(3)

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-[#5865F2]" />
            <h3 className="font-semibold">Discord Community</h3>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            {onlineCount} online
          </Badge>
        </div>

        <div className="space-y-2 mb-4">
          {members.map((member) => (
            <div key={member.username} className="flex items-center gap-2">
              <div
                className={`h-2 w-2 rounded-full ${
                  member.status === "online"
                    ? "bg-green-500"
                    : member.status === "idle"
                    ? "bg-yellow-500"
                    : "bg-gray-500"
                }`}
              />
              <span className="text-sm">{member.username}</span>
            </div>
          ))}
        </div>

        <Button
          className="w-full"
          style={{ backgroundColor: "#5865F2" }}
          onClick={() =>
            window.open("https://discord.gg/placeholder", "_blank")
          }
        >
          <Hash className="h-4 w-4 mr-2" />
          Join our Discord
        </Button>
      </CardContent>
    </Card>
  )
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1 text-xs border rounded px-2 py-1">
      {children}
    </div>
  )
}
