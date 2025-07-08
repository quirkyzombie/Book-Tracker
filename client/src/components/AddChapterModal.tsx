import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface AddChapterModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookId: number;
}

export function AddChapterModal({ isOpen, onClose, bookId }: AddChapterModalProps) {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const addChapterMutation = useMutation({
    mutationFn: async (chapterData: { title: string; bookId: number }) => {
      await apiRequest("POST", `/api/books/${bookId}/chapters`, chapterData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/books", bookId.toString()] });
      toast({
        title: "Success",
        description: "Chapter added successfully",
      });
      handleClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add chapter. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addChapterMutation.mutate({ title: title.trim(), bookId });
    }
  };

  const handleClose = () => {
    setTitle("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between text-2xl font-bold text-gray-900">
            Add New Chapter
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Add a new chapter to track your reading progress
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="chapter-title" className="text-base font-semibold text-gray-700">Chapter Title</Label>
            <Input
              id="chapter-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter chapter title"
              required
              className="mt-3 h-12 text-base rounded-xl border-2 focus:border-primary"
            />
          </div>
          
          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={handleClose}
              className="px-6 py-3 rounded-xl font-medium"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={addChapterMutation.isPending || !title.trim()}
              className="px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
              {addChapterMutation.isPending ? "Adding..." : "Add Chapter"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
