import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Undo,
  Redo,
  Heading2,
} from "lucide-react";

function ToolbarButton({ active, onClick, label, children }) {
  return (
    <button
      type="button"
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`flex h-8 w-8 items-center justify-center rounded-md border transition ${
        active
          ? "border-[#C9A84C] bg-[#C9A84C]/10 text-[#0B1F3A]"
          : "border-transparent text-gray-600 hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  );
}

/**
 * Rich text editor for admin "description" / "bio" / "content" fields.
 * Works alongside react-hook-form via controlled `value` + `onChange`:
 *
 *   <FormRichText
 *     label="Description"
 *     value={watch("description")}
 *     onChange={(html) => setValue("description", html, { shouldDirty: true })}
 *     error={errors.description?.message}
 *   />
 */
export default function FormRichText({
  label,
  value,
  onChange,
  error,
  placeholder = "Write something...",
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html === "<p></p>" ? "" : html);
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none min-h-[140px] px-3 py-2 focus:outline-none",
      },
    },
  });

  // Keep the editor in sync when the form value is reset externally
  // (e.g. switching between "add" and "edit", or on cancel).
  useEffect(() => {
    if (!editor) return;

    const current = editor.getHTML();
    const next = value || "";

    if (current !== next) {
      editor.commands.setContent(next, { emitUpdate: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, editor]);

  return (
    <div className="mb-4">
      {label && <label className="block mb-2 font-medium">{label}</label>}

      <div
        className={`overflow-hidden rounded-lg border ${
          error ? "border-red-400" : "border-gray-300"
        } focus-within:ring-2 focus-within:ring-[#C9A84C]`}
      >
        {editor && (
          <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-50 px-2 py-1.5">
            <ToolbarButton
              label="Heading"
              active={editor.isActive("heading", { level: 2 })}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
            >
              <Heading2 size={16} />
            </ToolbarButton>

            <ToolbarButton
              label="Bold"
              active={editor.isActive("bold")}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <Bold size={16} />
            </ToolbarButton>

            <ToolbarButton
              label="Italic"
              active={editor.isActive("italic")}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <Italic size={16} />
            </ToolbarButton>

            <ToolbarButton
              label="Bullet list"
              active={editor.isActive("bulletList")}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              <List size={16} />
            </ToolbarButton>

            <ToolbarButton
              label="Numbered list"
              active={editor.isActive("orderedList")}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
              <ListOrdered size={16} />
            </ToolbarButton>

            <div className="mx-1 h-5 w-px bg-gray-300" />

            <ToolbarButton
              label="Undo"
              onClick={() => editor.chain().focus().undo().run()}
            >
              <Undo size={16} />
            </ToolbarButton>

            <ToolbarButton
              label="Redo"
              onClick={() => editor.chain().focus().redo().run()}
            >
              <Redo size={16} />
            </ToolbarButton>
          </div>
        )}

        <EditorContent editor={editor} placeholder={placeholder} />
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}