"use client"
import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { X, Plus, Trash2, Edit, GripVertical } from "lucide-react"

interface Link {
  id: string
  title: string
  url: string
  description?: string
}

export default function LinktreeClone() {
  const [links, setLinks] = useState<Link[]>([])
  const [newLink, setNewLink] = useState<Link>({ id: "", title: "", url: "", description: "" })
  const [editingLink, setEditingLink] = useState<Link | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [linkToDelete, setLinkToDelete] = useState<string | null>(null)
  const [backgroundColor, setBackgroundColor] = useState("#ffffff")
  const [buttonStyle, setButtonStyle] = useState("rounded")
  const [font, setFont] = useState("sans")

  const addLink = () => {
    if (newLink.title && newLink.url) {
      setLinks([...links, { ...newLink, id: Date.now().toString() }])
      setNewLink({ id: "", title: "", url: "", description: "" })
    }
  }

  const updateLink = () => {
    if (editingLink) {
      setLinks(links.map((link) => (link.id === editingLink.id ? editingLink : link)))
      setEditingLink(null)
    }
  }

  const deleteLink = (id: string) => {
    setLinks(links.filter((link) => link.id !== id))
    setIsDeleteDialogOpen(false)
    setLinkToDelete(null)
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) return
    const newLinks = Array.from(links)
    const [reorderedLink] = newLinks.splice(result.source.index, 1)
    newLinks.splice(result.destination.index, 0, reorderedLink)
    setLinks(newLinks)
  }

  return (
    <div
      className={`min-h-screen p-4 sm:p-6 md:p-8 transition-colors duration-300 ${
        backgroundColor === "#ffffff" ? "bg-white" : "bg-gray-800"
      }`}
      style={{ fontFamily: font === "sans" ? "sans-serif" : "serif" }}
    >
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center mb-6">Your Linktree</h1>

        {/* Customization options */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <Label htmlFor="background-color">Background</Label>
            <Select onValueChange={(value) => setBackgroundColor(value)}>
              <SelectTrigger id="background-color">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="#ffffff">White</SelectItem>
                <SelectItem value="#f3f4f6">Light Gray</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="button-style">Button Style</Label>
            <Select onValueChange={(value) => setButtonStyle(value)}>
              <SelectTrigger id="button-style">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rounded">Rounded</SelectItem>
                <SelectItem value="squared">Squared</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="font">Font</Label>
            <Select onValueChange={(value) => setFont(value)}>
              <SelectTrigger id="font">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sans">Sans-serif</SelectItem>
                <SelectItem value="serif">Serif</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Add new link form */}
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Link Title"
            value={newLink.title}
            onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
          />
          <Input
            type="url"
            placeholder="URL"
            value={newLink.url}
            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
          />
          <Textarea
            placeholder="Description (optional)"
            value={newLink.description}
            onChange={(e) => setNewLink({ ...newLink, description: e.target.value })}
          />
          <Button onClick={addLink} className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Add Link
          </Button>
        </div>

        {/* List of links */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="links">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                {links.map((link, index) => (
                  <Draggable key={link.id} draggableId={link.id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`group relative p-4 bg-white shadow-md transition-all duration-300 ${
                          buttonStyle === "rounded" ? "rounded-lg" : ""
                        }`}
                      >
                        <div {...provided.dragHandleProps} className="absolute left-2 top-1/2 -translate-y-1/2">
                          <GripVertical className="h-5 w-5 text-gray-400" />
                        </div>
                        <div className="pl-8">
                          <h3 className="font-semibold">{link.title}</h3>
                          <p className="text-sm text-gray-500">{link.url}</p>
                          {link.description && <p className="text-sm mt-1">{link.description}</p>}
                        </div>
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setEditingLink(link)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setLinkToDelete(link.id)
                              setIsDeleteDialogOpen(true)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>

        {/* Edit link dialog */}
        {editingLink && (
          <Dialog open={!!editingLink} onOpenChange={() => setEditingLink(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Link</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Input
                  type="text"
                  placeholder="Link Title"
                  value={editingLink.title}
                  onChange={(e) => setEditingLink({ ...editingLink, title: e.target.value })}
                />
                <Input
                  type="url"
                  placeholder="URL"
                  value={editingLink.url}
                  onChange={(e) => setEditingLink({ ...editingLink, url: e.target.value })}
                />
                <Textarea
                  placeholder="Description (optional)"
                  value={editingLink.description}
                  onChange={(e) => setEditingLink({ ...editingLink, description: e.target.value })}
                />
              </div>
              <DialogFooter>
                <Button onClick={() => setEditingLink(null)} variant="outline">
                  Cancel
                </Button>
                <Button onClick={updateLink}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Delete confirmation dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this link? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setIsDeleteDialogOpen(false)} variant="outline">
                Cancel
              </Button>
              <Button onClick={() => linkToDelete && deleteLink(linkToDelete)} variant="destructive">
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}