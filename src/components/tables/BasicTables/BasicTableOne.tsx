import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";
import { getAllAsync, getFirstOrDefaultLeadAsync, putAsync, postEmailAsync } from "../../../services/LeadsGoogleService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Modal } from "../../ui/modal";
import Label from "../../form/Label";
import Input from "../../form/input/InputField";
import Select from "../../form/Select";
import Button from "../../ui/button/Button";
import { useModal } from "../../../hooks/useModal";
import { useModal as useModelEmail } from "../../../hooks/useModal";
import { useState } from "react";
import { LeadGoogleDto } from "../../../models/LeadsGoogleDto";
import TextArea from "../../form/input/TextArea";
import { EmailDto } from "../../../models/EmailDto";

export default function BasicTableOne() {

  const [formData, setFormData] = useState<LeadGoogleDto>({
    id: {
      timestamp: 0,
      creationTime: "",
    },
    name: "",
    phoneNumber: "",
    category: "",
    address: "",
    timeOpen: "",
    star: "",
    webSite: "",
    email: "",
    status: 0,
    observacao: "",
    social: ""
  });

  const [formDataEmail, setFormDataEmail] = useState<EmailDto>({
    body: "",
    subject: "",
    to: ""
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: putAsync,
    onSuccess: () => {
      queryClient.invalidateQueries<LeadGoogleDto[]>({
        queryKey: ["leadGoogle"],
      });
      closeModal();
    },
  });

  const mutationEmail = useMutation({
    mutationFn: postEmailAsync,
    onSuccess: () => {
      queryClient.invalidateQueries<LeadGoogleDto[]>({
        queryKey: ["leadGoogle"],
      });
      closeModalEmail();
    },
  });

  const { data: leads, isLoading, isError } = useQuery({
    queryKey: ["leadGoogle"],
    queryFn: () => getAllAsync(),
  });

  const { isOpen, openModal, closeModal } = useModal();

  const { isOpen: isOpenEmail, openModal: openModalEmail, closeModal: closeModalEmail } = useModelEmail();

  const handleOpenModal = (name: string, category: string, phoneNumber: string) => {
    loadLeadData(name, category, phoneNumber);
    openModal();
  };

  const handleOpenModalEmail = () => {
    openModalEmail();
  };


  const loadLeadData = async (name: string, category: string, phoneNumber: string) => {
    try {
      const lead = await getFirstOrDefaultLeadAsync(name, category, phoneNumber);
      if (typeof lead !== "string") {
        setFormData(lead);
      } else {
        console.log(lead);
      }

    } catch (error) {
      console.error("Erro ao buscar o lead:", error);
    }
  };


  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro ao carregar dados.</p>;

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
    closeModal();
  };

  const handlePostEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    mutationEmail.mutate(formDataEmail)
    closeModal();
  };

  const optionsCategoryLeadEdit = [
    { value: "odontologia", label: "Odontologia" },
    { value: "clinica-medica", label: "Clínica Médica" },
    { value: "hospital", label: "Hospital" },
    { value: "farmacia", label: "Farmácia" },
    { value: "mecanico", label: "Mecânico" },
    { value: "auto-peças", label: "Autopeças" },
    { value: "concessionaria", label: "Concessionária" },
    { value: "mercado", label: "Supermercado" },
    { value: "padaria", label: "Padaria" },
    { value: "restaurante", label: "Restaurante" },
    { value: "lanchonete", label: "Lanchonete" },
    { value: "petshop", label: "Pet Shop" },
    { value: "academia", label: "Academia" },
    { value: "estetica", label: "Clínica de Estética" },
    { value: "barbearia", label: "Barbearia" },
    { value: "salão-beleza", label: "Salão de Beleza" },
    { value: "hotel", label: "Hotel" },
    { value: "motel", label: "Motel" },
    { value: "pousada", label: "Pousada" },
    { value: "imobiliaria", label: "Imobiliária" },
    { value: "advocacia", label: "Escritório de Advocacia" },
    { value: "contabilidade", label: "Escritório de Contabilidade" },
    { value: "escola", label: "Escola" },
    { value: "faculdade", label: "Faculdade" },
    { value: "loja-roupas", label: "Loja de Roupas" },
    { value: "loja-celular", label: "Assistência Técnica Celular" },
    { value: "informatica", label: "Assistência Técnica Informática" },
    { value: "lavanderia", label: "Lavanderia" },
    { value: "floricultura", label: "Floricultura" },
    { value: "livraria", label: "Livraria" },
    { value: "construcao", label: "Materiais de Construção" },
    { value: "moveis", label: "Loja de Móveis" }
  ];

  const optionsEdit = [
    { value: "0", label: "Novo" },
    { value: "1", label: "Buscando informações" },
    { value: "2", label: "Prospecção" },
    { value: "3", label: "Aguardando decisão" },
    { value: "4", label: "Negociação" },
    { value: "5", label: "Reunião" },
    { value: "6", label: "Cancelado" },
    { value: "7", label: "Requalificado" },
    { value: "8", label: "Qualificado" },
    { value: "9", label: "Convertido" }
  ];

  const handleSelectChangeEdit = (value: string) => {
    formData.status = Number.parseInt(value);
  };

  const handleSelectChangeCategoryEdit = (value: string) => {
    formData.category = value;
  };

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
                Obs.
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {leads instanceof Array ? leads?.map((lead, index) => (
              <TableRow key={index}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {lead.name}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {lead.category}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      lead.status === 0
                        ? "success"
                        : lead.status === 1
                          ? "info"
                          : lead.status === 2
                            ? "info"
                            : lead.status === 3
                              ? "warning"
                              : lead.status === 4
                                ? "warning"
                                : lead.status === 5
                                  ? "warning"
                                  : lead.status === 6
                                    ? "error"
                                    : lead.status === 7
                                      ? "info"
                                      : lead.status === 8
                                        ? "success"
                                        : lead.status === 9
                                          ? "success"
                                          : "light"
                    }
                  >
                    {lead.status === 0
                      ? "Novo"
                      : lead.status === 1
                        ? "Buscando Info."
                        : lead.status === 2
                          ? "Prospecção"
                          : lead.status === 3
                            ? "Aguardando Decisão"
                            : lead.status === 4
                              ? "Negociação"
                              : lead.status === 5
                                ? "Reunião"
                                : lead.status === 6
                                  ? "Cancelado"
                                  : lead.status === 7
                                    ? "Requalificado"
                                    : lead.status === 8
                                      ? "Qualificado"
                                      : lead.status === 9
                                        ? "Convertido"
                                        : "Desconhecido"}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {lead.phoneNumber || "Não informado"}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {lead.address}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {lead.webSite}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {lead.observacao}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => handleOpenModal(lead.name, lead.category, lead.phoneNumber)}
                      rel="noopener"
                      className="p-3 flex h-11 w-11 items-center justify-center rounded-full border border-yellow-300 bg-white text-sm font-medium text-yellow-700 shadow-theme-xs hover:bg-yellow-50 hover:text-yellow-800 dark:border-yellow-700 dark:bg-yellow-800 dark:text-yellow-400 dark:hover:bg-white/[0.03] dark:hover:text-yellow-200"
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
                    </button>
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
                      href={`https://wa.me/+55${lead.phoneNumber.replace('(', '').replace(')', '').replace('-', '').replace(' ', '')}?text=Ol%C3%A1%2C%20sou%20representante%20da%20InnovaSfera!%20Uma%20empresa%20de%20tecnologia%20voltada%20para%20atender%20demandas%20sob-medida!`}
                      target="_blank"
                      rel="noopener"
                      className="p-3 flex h-11 w-11 items-center justify-center rounded-full border border-green-300 bg-white text-sm font-medium text-green-700 shadow-theme-xs hover:bg-green-50 hover:text-green-800 dark:border-green-700 dark:bg-green-800 dark:text-green-400 dark:hover:bg-white/[0.03] dark:hover:text-green-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                      </svg>
                    </a>

                    <button
                      onClick={() => handleOpenModalEmail()}
                      rel="noopener"
                      className="p-3 flex h-11 w-11 items-center justify-center rounded-full border border-blue-300 bg-white text-sm font-medium text-blue-700 shadow-theme-xs hover:bg-blue-50 hover:text-blue-800 dark:border-blue-700 dark:bg-blue-800 dark:text-blue-400 dark:hover:bg-white/[0.03] dark:hover:text-blue-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
                      </svg>
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            )) : <></>}
          </TableBody>
        </Table>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Editando lead
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Adicione as informações para atualizar o Lead
            </p>
          </div>
          <form className="flex flex-col" onSubmit={handleSaveEdit}>
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div>
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Informações
                </h5>
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div>
                    <Label>Nome</Label>
                    <Input
                      type="text"
                      placeholder="Nome fantasia da empresa"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Telefone</Label>
                    <Input
                      type="text"
                      placeholder="(11) 90011-0011"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>E-mail</Label>
                    <Input
                      type="email"
                      placeholder="innnovasfera@innovasfera.com.br"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Endereço</Label>
                    <Input
                      type="text"
                      placeholder="Endereço completo"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Site</Label>
                    <Input
                      type="text"
                      placeholder="www.innovasfera.com.br"
                      value={formData.webSite || ""}
                      onChange={(e) => setFormData({ ...formData, webSite: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Rede Social</Label>
                    <Input
                      type="text"
                      placeholder="@innovasfera"
                      value={formData.social || ""}
                      onChange={(e) => setFormData({ ...formData, social: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Avaliação</Label>
                    <Input
                      type="number"
                      placeholder="1"
                      value={formData.star}
                      onChange={(e) => setFormData({ ...formData, star: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Categoria</Label>
                    <Select
                      options={optionsCategoryLeadEdit}
                      placeholder="Categoria do negócio"
                      onChange={handleSelectChangeCategoryEdit}
                      className="dark:bg-dark-900"
                    />
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Select
                      options={optionsEdit}
                      placeholder="Selecione um status"
                      onChange={handleSelectChangeEdit}
                      className="dark:bg-dark-900"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Cancelar
              </Button>
              <button
                className="bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 px-4 py-3 text-sm inline-flex items-center justify-center gap-2 rounded-lg transition"
                type="submit"
              >
                Editar
              </button>
            </div>
          </form>
        </div>
      </Modal>

      <Modal isOpen={isOpenEmail} onClose={closeModalEmail} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Envio de email
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Personalize sua mensagem de e-mail, lembrando que a mensagem ficará dentro do template de e-mail
            </p>
          </div>
          <form className="flex flex-col" onSubmit={handlePostEmail}>
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div>
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Informações
                </h5>
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div>
                    <Label>Para quem vai enviar</Label>
                    <Input
                      type="text"
                      placeholder="contato@innovasfera.com.br"
                      value={formDataEmail.to}
                      onChange={(e) => setFormDataEmail({ ...formDataEmail, to: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Assunto</Label>
                    <Input
                      type="text"
                      placeholder="Assunto do e-mail"
                      value={formDataEmail.subject}
                      onChange={(e) => setFormDataEmail({ ...formDataEmail, subject: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-1">

                  <div>
                    <Label>Mensagem de e-mail</Label>
                    <TextArea
                      placeholder="Escreva a mensagem do e-mail personalizada aqui"
                      value={formDataEmail.body}
                      onChange={(e) => setFormDataEmail({ ...formDataEmail, body: e })}
                    />

                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div className="flex items-center gap-3 px-2 mt-6 lg:justify-start">
                <a
                  href="https://chatgpt.com/"
                  target="_blank"
                  rel="noopener"
                  className="p-3 flex h-11 w-11 items-center justify-center rounded-full border border-green-300 bg-white text-sm font-medium text-green-700 shadow-theme-xs hover:bg-green-50 hover:text-green-800 dark:border-green-700 dark:bg-green-800 dark:text-green-400 dark:hover:bg-white/[0.03] dark:hover:text-green-200"
                ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                </a>
              </div>
              <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                <Button size="sm" variant="outline" onClick={closeModalEmail}>
                  Cancelar
                </Button>
                <button
                  className="bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 px-4 py-3 text-sm inline-flex items-center justify-center gap-2 rounded-lg transition"
                  type="submit"
                >
                  Enviar
                </button>
              </div>
            </div>
          </form>

        </div>
      </Modal>
    </div>
  );
}
