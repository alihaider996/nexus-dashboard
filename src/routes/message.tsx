import { useMemo, useState, type KeyboardEvent } from "react"
import {
  ChevronDown,
  FileText,
  Folder,
  Image as ImageIcon,
  Mic,
  MoreHorizontal,
  Paperclip,
  Pencil,
  Phone,
  PlayCircle,
  Plus,
  Search,
  Send,
  Smile,
  Video,
} from "lucide-react"

import { createFileRoute } from "@tanstack/react-router"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export const Route = createFileRoute("/message")({
  component: MessagePage,
})

type Conversation = {
  id: number
  name: string
  message: string
  time: string
  image: string
  typing?: boolean
  unread?: number
  group?: boolean
}

type ChatMessage = {
  id: number
  sender: string
  text?: string
  time: string
  image?: boolean
  own?: boolean
}

type Member = {
  id: number
  name: string
  image: string
}

const conversations: Conversation[] = [
  {
    id: 1,
    name: "Hatypo Studio",
    message: "Mas Aditt Typing...",
    time: "09:26 PM",
    image: "https://i.pravatar.cc/100?img=12",
    typing: true,
    unread: 2,
    group: true,
  },
  {
    id: 2,
    name: "Odama Studio",
    message: "Mas Hapy Typing...",
    time: "09:11 PM",
    image: "https://i.pravatar.cc/100?img=32",
    typing: true,
    unread: 1,
    group: true,
  },
  {
    id: 3,
    name: "Nolaaa",
    message: "pppppppppppppppppp",
    time: "09:12 PM",
    image: "https://i.pravatar.cc/100?img=47",
    unread: 1,
  },
  {
    id: 4,
    name: "OMOC Project",
    message: "Aditt Typing...",
    time: "09:11 PM",
    image: "https://i.pravatar.cc/100?img=5",
    unread: 2,
    group: true,
  },
  {
    id: 5,
    name: "Mamon",
    message: "Typing...",
    time: "09:26 PM",
    image: "https://i.pravatar.cc/100?img=11",
    typing: true,
  },
  {
    id: 6,
    name: "Farhan",
    message: "Cek Figma coba han",
    time: "09:25 PM",
    image: "https://i.pravatar.cc/100?img=13",
  },
  {
    id: 7,
    name: "Mas Aditt",
    message: "Typing...",
    time: "09:21 AM",
    image: "https://i.pravatar.cc/100?img=15",
    typing: true,
  },
  {
    id: 8,
    name: "Zhofran",
    message: "Youuu djoop",
    time: "Yesterday",
    image: "https://i.pravatar.cc/100?img=18",
  },
  {
    id: 9,
    name: "Vitoo",
    message: "Pie to jerumu?",
    time: "Yesterday",
    image: "https://i.pravatar.cc/100?img=20",
  },
]

const chatMessages: ChatMessage[] = [
  {
    id: 1,
    sender: "Raull",
    text: "Guysss cek Figmaa doku, minta feedbacknyaaa",
    time: "09:00 PM",
  },
  {
    id: 2,
    sender: "You",
    text: "Gakill Bangettt!",
    time: "09:02 PM",
    own: true,
  },
  {
    id: 3,
    sender: "Farhan",
    text: "Ada yang typo nih",
    time: "09:20 AM",
    image: true,
  },
  {
    id: 4,
    sender: "Mamon",
    text: "Gas ULLLL!",
    time: "09:21 AM",
  },
  {
    id: 5,
    sender: "Nolaaa",
    text: "Like dulu guyss hehe\nhttps://www.instagram.com/p/Cq2AzG_",
    time: "09:25 AM",
  },
]

const members: Member[] = [
  {
    id: 1,
    name: "Faza Dzikrullah",
    image: "https://i.pravatar.cc/100?img=12",
  },
  {
    id: 2,
    name: "Adhitya P.",
    image: "https://i.pravatar.cc/100?img=14",
  },
  {
    id: 3,
    name: "Raul Khaq",
    image: "https://i.pravatar.cc/100?img=16",
  },
  {
    id: 4,
    name: "Vito Arvy",
    image: "https://i.pravatar.cc/100?img=20",
  },
  {
    id: 5,
    name: "Nola Sofyan",
    image: "https://i.pravatar.cc/100?img=23",
  },
]

function MessagePage() {
  const [activeConversation, setActiveConversation] = useState(1)
  const [search, setSearch] = useState("")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState(chatMessages)

  const filteredConversations = useMemo(() => {
    return conversations.filter((conversation) =>
      conversation.name.toLowerCase().includes(search.toLowerCase()),
    )
  }, [search])

  const sendMessage = () => {
    const trimmedMessage = message.trim()

    if (!trimmedMessage) return

    setMessages((current) => [
      ...current,
      {
        id: Date.now(),
        sender: "You",
        text: trimmedMessage,
        time: "Now",
        own: true,
      },
    ])

    setMessage("")
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="h-[calc(100vh-7rem)] min-h-[620px] overflow-hidden rounded-2xl border bg-card shadow-sm">
      <div className="grid h-full grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)_235px]">

        {/*
            LEFT - MESSAGES LIST
    */}
        <aside className="flex min-h-0 flex-col border-r bg-white dark:bg-card">
          <div className="flex items-center justify-between px-5 py-5">
            <h1 className="text-xl font-bold text-blue-500">
              Messages
            </h1>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 rounded-full"
            >
              <Pencil className="size-4" />
            </Button>
          </div>

          <div className="px-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search..."
                className="h-9 border-none bg-muted/60 pl-9 text-xs shadow-none focus-visible:ring-1"
              />
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4">

            {/* Pinned */}
            <div className="mb-4">
              <p className="mb-2 px-2 text-[10px] font-medium text-muted-foreground">
                📌 Pinned Message
              </p>

              {filteredConversations
                .filter((conversation) => conversation.group)
                .map((conversation) => (
                  <ConversationItem
                    key={conversation.id}
                    conversation={conversation}
                    active={activeConversation === conversation.id}
                    onClick={() =>
                      setActiveConversation(conversation.id)
                    }
                  />
                ))}
            </div>

            <Separator className="mb-4" />

            {/* All Messages */}
            <div>
              <p className="mb-2 px-2 text-[10px] font-medium text-muted-foreground">
                💬 All Message
              </p>

              {filteredConversations
                .filter((conversation) => !conversation.group)
                .map((conversation) => (
                  <ConversationItem
                    key={conversation.id}
                    conversation={conversation}
                    active={activeConversation === conversation.id}
                    onClick={() =>
                      setActiveConversation(conversation.id)
                    }
                  />
                ))}
            </div>
          </div>
        </aside>
        {/*CENTER - CHAT*/}
        <section className="flex min-h-0 flex-col bg-[#fbfcff] dark:bg-background">

          {/* Chat Header */}
          <div className="flex items-center justify-between border-b bg-white px-5 py-4 dark:bg-card">
            <div className="flex items-center gap-3">
              <Avatar className="size-9">
                <AvatarImage
                  src="https://i.pravatar.cc/100?img=12"
                  alt="Hatypo Studio"
                />
                <AvatarFallback>HS</AvatarFallback>
              </Avatar>

              <div>
                <h2 className="text-sm font-semibold">
                  Hatypo Studio
                </h2>

                <p className="text-[10px] text-emerald-500">
                  Mas Aditt Typing...
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <div className="mr-2 flex -space-x-2">
                {[12, 14, 16].map((image) => (
                  <Avatar
                    key={image}
                    className="size-7 border-2 border-white dark:border-card"
                  >
                    <AvatarImage
                      src={`https://i.pravatar.cc/100?img=${image}`}
                    />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                ))}

                <div className="flex size-7 items-center justify-center rounded-full border-2 border-white bg-muted text-[9px] font-medium dark:border-card">
                  7
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="size-8"
              >
                <Video className="size-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="size-8"
              >
                <Phone className="size-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="size-8"
              >
                <MoreHorizontal className="size-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">

            <div className="mb-5 flex justify-center">
              <Badge
                variant="secondary"
                className="rounded-full bg-white px-3 py-1 text-[9px] font-medium shadow-sm"
              >
                Today, Jan 30
              </Badge>
            </div>

            <div className="space-y-5">
              {messages.map((chat) => (
                <ChatBubble key={chat.id} message={chat} />
              ))}
            </div>
          </div>

          {/* Composer */}
          <div className="border-t bg-white p-3 dark:bg-card">
            <div className="flex items-center gap-2 rounded-xl bg-muted/60 px-2">
              <Button
                variant="ghost"
                size="icon"
                className="size-8 shrink-0"
              >
                <Paperclip className="size-4 text-muted-foreground" />
              </Button>

              <Input
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message"
                className="h-10 border-none bg-transparent px-1 text-xs shadow-none focus-visible:ring-0"
              />

              <Button
                variant="ghost"
                size="icon"
                className="size-8 shrink-0"
              >
                <Smile className="size-4 text-muted-foreground" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="size-8 shrink-0"
              >
                <Mic className="size-4 text-muted-foreground" />
              </Button>

              <Button
                onClick={sendMessage}
                size="icon"
                className="size-8 shrink-0 rounded-lg bg-blue-500 hover:bg-blue-600"
              >
                <Send className="size-4" />
              </Button>
            </div>
          </div>
        </section>
        {/*RIGHT - GROUP DETA*/}
        <aside className="hidden min-h-0 flex-col border-l bg-white xl:flex dark:bg-card">

          {/* Group Profile */}
          <div className="flex flex-col items-center px-5 py-6">
            <Avatar className="mb-3 size-16">
              <AvatarImage
                src="https://i.pravatar.cc/150?img=12"
                alt="Hatypo Studio"
              />
              <AvatarFallback>HS</AvatarFallback>
            </Avatar>

            <h2 className="text-sm font-semibold">
              Hatypo Studio
            </h2>

            <p className="mt-1 text-[10px] text-muted-foreground">
              Create something New
            </p>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-5">
            {/* Members */}
            <div className="mb-6">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-xs font-semibold">
                  Members
                </h3>

                <ChevronDown className="size-3.5 text-muted-foreground" />
              </div>
              <Button
                variant="ghost"
                className="mb-3 h-8 w-full justify-start gap-2 px-0 text-xs font-medium text-blue-500 hover:bg-transparent hover:text-blue-600"
              >
                <span className="flex size-6 items-center justify-center rounded-full bg-blue-50">
                  <Plus className="size-3.5" />
                </span>

                Add Member
              </Button>

              <div className="space-y-3">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-2"
                  >
                    <Avatar className="size-7">
                      <AvatarImage
                        src={member.image}
                        alt={member.name}
                      />
                      <AvatarFallback>
                        {member.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <span className="text-[11px] font-medium">
                      {member.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="mb-5" />

            {/* Attachments */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-xs font-semibold">
                  Attachments
                </h3>

                <ChevronDown className="size-3.5 text-muted-foreground" />
              </div>

              <div className="space-y-4">

                <AttachmentItem
                  icon={<FileText className="size-4" />}
                  title="Document"
                  subtitle="129 Files · 375 MB"
                />

                <AttachmentItem
                  icon={<ImageIcon className="size-4" />}
                  title="Photo"
                  subtitle="938 Files · 17 GB"
                />

                <AttachmentItem
                  icon={<PlayCircle className="size-4" />}
                  title="Videos"
                  subtitle="76 Files · 2.3 GB"
                />

                <AttachmentItem
                  icon={<Folder className="size-4" />}
                  title="Other Files"
                  subtitle="71 Files · 1.0 GB"
                />

              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

/*CONVERSATION ITEM */

function ConversationItem({
  conversation,
  active,
  onClick,
}: {
  conversation: Conversation
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`mb-1 flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left transition ${
        active
          ? "bg-blue-50 dark:bg-blue-500/10"
          : "hover:bg-muted/60"
      }`}
    >
      <Avatar className="size-9 shrink-0">
        <AvatarImage
          src={conversation.image}
          alt={conversation.name}
        />
        <AvatarFallback>
          {conversation.name.charAt(0)}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-[11px] font-semibold">
            {conversation.name}
          </p>

          <span className="shrink-0 text-[8px] text-muted-foreground">
            {conversation.time}
          </span>
        </div>

        <div className="mt-0.5 flex items-center justify-between gap-2">
          <p
            className={`truncate text-[9px] ${
              conversation.typing
                ? "text-emerald-500"
                : "text-muted-foreground"
            }`}
          >
            {conversation.message}
          </p>

          {conversation.unread && (
            <span className="flex size-3.5 shrink-0 items-center justify-center rounded-full bg-red-500 text-[7px] font-semibold text-white">
              {conversation.unread}
            </span>
          )}
        </div>
      </div>
    </button>
  )
}

/*CHAT BUBBLE */

function ChatBubble({ message }: { message: ChatMessage }) {
  if (message.own) {
    return (
      <div className="flex justify-end">
        <div className="flex max-w-[75%] items-end gap-2">
          <div className="text-right">
            <p className="mb-1 text-[8px] text-muted-foreground">
              {message.time}
            </p>

            <div className="rounded-2xl rounded-br-sm bg-blue-500 px-3 py-2 text-left text-[10px] text-white shadow-sm">
              {message.text}
            </div>
          </div>

          <Avatar className="size-7">
            <AvatarImage src="https://i.pravatar.cc/100?img=33" />
            <AvatarFallback>Y</AvatarFallback>
          </Avatar>
        </div>
      </div>
    )
  }

  return (
    <div className="flex max-w-[80%] items-start gap-2">
      <Avatar className="mt-1 size-7">
        <AvatarImage
          src={`https://i.pravatar.cc/100?img=${
            message.sender === "Raull"
              ? 12
              : message.sender === "Farhan"
                ? 13
                : message.sender === "Mamon"
                  ? 15
                  : 17
          }`}
        />
        <AvatarFallback>
          {message.sender.charAt(0)}
        </AvatarFallback>
      </Avatar>

      <div>
        <div className="mb-1 flex items-center gap-2">
          <span className="text-[9px] font-semibold">
            {message.sender}
          </span>

          <span className="text-[8px] text-muted-foreground">
            {message.time}
          </span>
        </div>

        {message.image ? (
          <div className="overflow-hidden rounded-xl bg-white shadow-sm">
            <div className="flex h-24 w-36 items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900">
              <div className="text-center text-white">
                <p className="text-[8px] font-semibold">
                  Visual Identity
                </p>
                <p className="text-[7px] opacity-70">
                  guidelines
                </p>
              </div>
            </div>

            <p className="px-3 py-2 text-[9px]">
              {message.text}
            </p>
          </div>
        ) : (
          <div className="whitespace-pre-line rounded-2xl rounded-tl-sm bg-white px-3 py-2 text-[10px] shadow-sm dark:bg-card">
            {message.text}
          </div>
        )}
      </div>
    </div>
  )
}

/*ATTACHMENT ITEM */

function AttachmentItem({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode
  title: string
  subtitle: string
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        {icon}
      </div>

      <div>
        <p className="text-[10px] font-medium">
          {title}
        </p>

        <p className="mt-0.5 text-[8px] text-muted-foreground">
          {subtitle}
        </p>
      </div>
    </div>
  )
}