import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";
import { getAll } from "../../../services/LeadsGoogleService";
import { useQuery } from "@tanstack/react-query";


export default function BasicTableOne() {

  const { data: leads, isLoading, isError } = useQuery({
    queryKey: ["leadGoogle"],
    queryFn: () => getAll(),
  });

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro ao carregar dados.</p>;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Nome Empresa
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Categoria
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Telefone
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Endereço
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Site
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {leads instanceof Array ? leads?.map((lead, index) => (
              <TableRow key={index}>
                {/* Nome da Empresa */}
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {lead.name}
                      </span>
                    </div>
                  </div>
                </TableCell>

                {/* Categoria */}
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {lead.category}
                </TableCell>

                {/* Status */}
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      lead.status === 0
                        ? "success"
                        : lead.status === 1
                          ? "warning"
                          : "error"
                    }
                  >
                    {lead.status === 0 ? "Novo" : "Inativo"}
                  </Badge>
                </TableCell>

                {/* Telefone */}
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {lead.phoneNumber || "Não informado"}
                </TableCell>

                {/* Endereço */}
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {lead.address}
                </TableCell>
                {/* Site */}
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {lead.webSite}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <a
                      href="https://www.facebook.com/PimjoHQ"
                      target="_blank"
                      rel="noopener"
                      className="p-3 flex h-11 w-11 items-center justify-center rounded-full border border-green-300 bg-white text-sm font-medium text-green-700 shadow-theme-xs hover:bg-green-50 hover:text-green-800 dark:border-green-700 dark:bg-green-800 dark:text-green-400 dark:hover:bg-white/[0.03] dark:hover:text-green-200"
                    >
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                        />
                      </svg>
                    </a>

                    <a
                      href="https://www.facebook.com/PimjoHQ"
                      target="_blank"
                      rel="noopener"
                      className="p-3 flex h-11 w-11 items-center justify-center rounded-full border border-red-300 bg-white text-sm font-medium text-red-700 shadow-theme-xs hover:bg-red-50 hover:text-red-800 dark:border-red-700 dark:bg-red-800 dark:text-red-400 dark:hover:bg-white/[0.03] dark:hover:text-red-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </a>

                    <a
                      href={`https://wa.me/+55${lead.phoneNumber.replace('(','').replace(')','').replace('-','').replace(' ', '')}?text=Ol%C3%A1%2C%20sou%20representante%20da%20InnovaSfera!%20Uma%20empresa%20de%20tecnologia%20voltada%20para%20atender%20demandas%20sob-medida!`}
                      target="_blank"
                      rel="noopener"
                      className="p-3 flex h-11 w-11 items-center justify-center rounded-full border border-green-300 bg-white text-sm font-medium text-green-700 shadow-theme-xs hover:bg-green-50 hover:text-green-800 dark:border-green-700 dark:bg-green-800 dark:text-green-400 dark:hover:bg-white/[0.03] dark:hover:text-green-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                      </svg>
                    </a>

                    <a
                      href="https://www.facebook.com/PimjoHQ"
                      target="_blank"
                      rel="noopener"
                      className="p-3 flex h-11 w-11 items-center justify-center rounded-full border border-blue-300 bg-white text-sm font-medium text-blue-700 shadow-theme-xs hover:bg-blue-50 hover:text-blue-800 dark:border-blue-700 dark:bg-blue-800 dark:text-blue-400 dark:hover:bg-white/[0.03] dark:hover:text-blue-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
                      </svg>
                    </a>
                  </div>
                </TableCell>
              </TableRow>
            )) : <></>}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
