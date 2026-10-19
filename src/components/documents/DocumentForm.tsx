"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// 1. Esquema de Validação Zod
const documentSchema = z.object({
  titulo: z.string().min(1, "O título é obrigatório"),
  categoria: z.string().min(1, "A categoria é obrigatória"),
  cdd: z.string().min(1, "O CDD é obrigatório"),
  dataEmissao: z.string().min(1, "Data de emissão obrigatória"),
  dataVencimento: z.string().min(1, "Data de vencimento obrigatória"),
  alertas: z.string().optional(),
}).refine((data) => {
  // Garante que o vencimento é posterior à emissão
  return new Date(data.dataVencimento) > new Date(data.dataEmissao);
}, {
  message: "O vencimento deve ser posterior à emissão",
  path: ["dataVencimento"],
});

type DocumentFormValues = z.infer<typeof documentSchema>;

export default function DocumentForm() {
  const router = useRouter();
  
  const { register, handleSubmit, formState: { errors } } = useForm<DocumentFormValues>({
    resolver: zodResolver(documentSchema),
  });

  // 2. Simulação de envio
  const onSubmit = (data: DocumentFormValues) => {
    console.log("Dados salvos:", data);
    alert("Documento salvo com sucesso!"); // Simula o sucesso
    router.push("/documents"); // Redireciona de volta
  };

  const handleCancel = () => {
    router.push("/documents");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 max-w-2xl bg-white rounded shadow">
      {/* Título */}
      <div>
        <label className="block text-sm font-bold mb-1">Título</label>
        <input {...register("titulo")} className="border p-2 w-full rounded" />
        {errors.titulo && <span className="text-red-500 text-sm">{errors.titulo.message}</span>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Categoria */}
        <div>
          <label className="block text-sm font-bold mb-1">Categoria</label>
          <input {...register("categoria")} className="border p-2 w-full rounded" />
          {errors.categoria && <span className="text-red-500 text-sm">{errors.categoria.message}</span>}
        </div>

        {/* CDD */}
        <div>
          <label className="block text-sm font-bold mb-1">CDD</label>
          <input {...register("cdd")} className="border p-2 w-full rounded" />
          {errors.cdd && <span className="text-red-500 text-sm">{errors.cdd.message}</span>}
        </div>

        {/* Data de Emissão */}
        <div>
          <label className="block text-sm font-bold mb-1">Data de Emissão</label>
          <input type="date" {...register("dataEmissao")} className="border p-2 w-full rounded" />
          {errors.dataEmissao && <span className="text-red-500 text-sm">{errors.dataEmissao.message}</span>}
        </div>

        {/* Data de Vencimento */}
        <div>
          <label className="block text-sm font-bold mb-1">Data de Vencimento</label>
          <input type="date" {...register("dataVencimento")} className="border p-2 w-full rounded" />
          {errors.dataVencimento && <span className="text-red-500 text-sm">{errors.dataVencimento.message}</span>}
        </div>
      </div>

      {/* Alertas */}
      <div>
        <label className="block text-sm font-bold mb-1">Alertas</label>
        <input {...register("alertas")} placeholder="Ex: Avisar 5 dias antes" className="border p-2 w-full rounded" />
      </div>

      {/* Botões */}
      <div className="flex gap-4 mt-4 justify-end">
        <button type="button" onClick={handleCancel} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
          Cancelar
        </button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Salvar
        </button>
      </div>
    </form>
  );
}