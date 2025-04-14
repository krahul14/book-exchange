type Props = {
    book: any;
    userId: string;
    onEdit: (b: any) => void;
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
  };
  
  export default function BookCard({ book, userId, onEdit, onDelete, onToggle }: Props) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img src={book.cover} alt={book.title} className="w-full h-48 object-cover" />
        <div className="p-4 space-y-1">
          <h3 className="font-bold text-lg">{book.title}</h3>
          <p className="text-gray-600 text-sm">By {book.author}</p>
          <p className="text-sm">Genre: {book.genre}</p>
          <p className="text-sm">Contact: {book.contact}</p>
          <p className="text-sm font-semibold">Status: {book.status}</p>
  
          {book.ownerId === userId && (
            <div className="space-x-2 pt-2">
              <button onClick={() => onToggle(book.id)} className="text-blue-600">Toggle</button>
              <button onClick={() => onEdit(book)} className="text-green-600">Edit</button>
              <button onClick={() => onDelete(book.id)} className="text-red-600">Delete</button>
            </div>
          )}
        </div>
      </div>
    );
  }
  