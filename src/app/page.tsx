import DocumentForm from "@/components/documents/DocumentForm";

export default function NewDocumentPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Novo Documento</h1>
      <DocumentForm />
    </div>
  );
}