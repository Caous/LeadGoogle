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
              </TableRow>
            )) : <></>}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
