import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";
import Button from "../../components/ui/button/Button";
import { Modal } from "../../components/ui/modal";
import { useModal } from "../../hooks/useModal";
import { LeadGoogleDto } from "../../models/LeadsGoogleDto";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postAsync } from "../../services/LeadsGoogleService";
import TextArea from "../../components/form/input/TextArea";

export default function BasicTables() {

  const { isOpen, openModal, closeModal } = useModal();
  const [formData, setFormData] = useState<LeadGoogleDto>({
    id: "",
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
    social: "",
    boxEmail: "",
    historico: []
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: postAsync,
    onSuccess: () => {
      queryClient.invalidateQueries<LeadGoogleDto[]>({
        queryKey: ["leadGoogle"],
      });
      closeModal();
    },
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
    closeModal();
  };

  const optionsCategoryLead = [
    { value: "academia", label: "Academia" },
    { value: "advocacia", label: "Escritório de Advocacia" },
    { value: "auto-peças", label: "Autopeças" },
    { value: "barbearia", label: "Barbearia" },
    { value: "clinica-medica", label: "Clínica Médica" },
    { value: "concessionaria", label: "Concessionária" },
    { value: "construcao", label: "Materiais de Construção" },
    { value: "contabilidade", label: "Escritório de Contabilidade" },
    { value: "escola", label: "Escola" },
    { value: "estetica", label: "Clínica de Estética" },
    { value: "eventos", label: "Eventos" },
    { value: "faculdade", label: "Faculdade" },
    { value: "farmacia", label: "Farmácia" },
    { value: "floricultura", label: "Floricultura" },
    { value: "hospital", label: "Hospital" },
    { value: "hotel", label: "Hotel" },
    { value: "imobiliaria", label: "Imobiliária" },
    { value: "informatica", label: "Assistência Técnica Informática" },
    { value: "lanchonete", label: "Lanchonete" },
    { value: "lavanderia", label: "Lavanderia" },
    { value: "livraria", label: "Livraria" },
    { value: "loja-celular", label: "Assistência Técnica Celular" },
    { value: "loja-roupas", label: "Loja de Roupas" },
    { value: "marketing", label: "Marketing" },
    { value: "mecanico", label: "Mecânico" },
    { value: "mercado", label: "Supermercado" },
    { value: "motel", label: "Motel" },
    { value: "moveis", label: "Loja de Móveis" },
    { value: "odontologia", label: "Odontologia" },
    { value: "padaria", label: "Padaria" },
    { value: "petshop", label: "Pet Shop" },
    { value: "pousada", label: "Pousada" },
    { value: "restaurante", label: "Restaurante" },
    { value: "salão-beleza", label: "Salão de Beleza" },
    { value: "show", label: "Show" }
  ];

  const options = [
    { value: "3", label: "Aguardando decisão" },
    { value: "1", label: "Buscando informações" },
    { value: "6", label: "Cancelado" },
    { value: "9", label: "Convertido" },
    { value: "4", label: "Negociação" },
    { value: "0", label: "Novo" },
    { value: "2", label: "Prospecção" },
    { value: "8", label: "Qualificado" },
    { value: "7", label: "Requalificado" },
    { value: "5", label: "Reunião" }
  ];

  const handleSelectChange = (value: string) => {
    formData.status = Number.parseInt(value);
  };

  const handleSelectChangeCategory = (value: string) => {
    formData.category = value;
  };



  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />

      <PageBreadcrumb pageTitle="Leads Innova" />

      <div className="flex justify-between gap-6 mb-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center w-full">
          <div className="relative w-full">
            <button className="absolute -translate-y-1/2 left-4 top-1/2">
              <svg
                className="fill-gray-500 dark:fill-gray-400"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.04199 9.37381C3.04199 5.87712 5.87735 3.04218 9.37533 3.04218C12.8733 3.04218 15.7087 5.87712 15.7087 9.37381C15.7087 12.8705 12.8733 15.7055 9.37533 15.7055C5.87735 15.7055 3.04199 12.8705 3.04199 9.37381ZM9.37533 1.54218C5.04926 1.54218 1.54199 5.04835 1.54199 9.37381C1.54199 13.6993 5.04926 17.2055 9.37533 17.2055C11.2676 17.2055 13.0032 16.5346 14.3572 15.4178L17.1773 18.2381C17.4702 18.531 17.945 18.5311 18.2379 18.2382C18.5308 17.9453 18.5309 17.4704 18.238 17.1775L15.4182 14.3575C16.5367 13.0035 17.2087 11.2671 17.2087 9.37381C17.2087 5.04835 13.7014 1.54218 9.37533 1.54218Z"
                  fill=""
                ></path>
              </svg>
            </button>
            <input
              type="text"
              placeholder="Search..."
              className="dark:bg-dark-900 h-[42px] w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-[42px] pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 "
            />
          </div>
        </div>
        <button onClick={openModal} className="inline-flex w-3xs items-center justify-center gap-2 rounded-lg transition  px-5 py-3.5 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 ">
          <span className="flex items-center">
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.77692 3.24224C9.91768 3.17186 10.0834 3.17186 10.2241 3.24224L15.3713 5.81573L10.3359 8.33331C10.1248 8.43888 9.87626 8.43888 9.66512 8.33331L4.6298 5.81573L9.77692 3.24224ZM3.70264 7.0292V13.4124C3.70264 13.6018 3.80964 13.775 3.97903 13.8597L9.25016 16.4952L9.25016 9.7837C9.16327 9.75296 9.07782 9.71671 8.99432 9.67496L3.70264 7.0292ZM10.7502 16.4955V9.78396C10.8373 9.75316 10.923 9.71683 11.0067 9.67496L16.2984 7.0292V13.4124C16.2984 13.6018 16.1914 13.775 16.022 13.8597L10.7502 16.4955ZM9.41463 17.4831L9.10612 18.1002C9.66916 18.3817 10.3319 18.3817 10.8949 18.1002L16.6928 15.2013C17.3704 14.8625 17.7984 14.17 17.7984 13.4124V6.58831C17.7984 5.83076 17.3704 5.13823 16.6928 4.79945L10.8949 1.90059C10.3319 1.61908 9.66916 1.61907 9.10612 1.90059L9.44152 2.57141L9.10612 1.90059L3.30823 4.79945C2.63065 5.13823 2.20264 5.83076 2.20264 6.58831V13.4124C2.20264 14.17 2.63065 14.8625 3.30823 15.2013L9.10612 18.1002L9.41463 17.4831Z"
                fill="currentColor"
              ></path>
            </svg>
          </span>
          Cadastrar Lead
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Cadastrar um lead
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Adicione as informações para registrar um novo lead
            </p>
          </div>
          <form className="flex flex-col" onSubmit={handleSave}>
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
                      options={optionsCategoryLead}
                      placeholder="Categoria do negócio"
                      onChange={handleSelectChangeCategory}
                      className="dark:bg-dark-900"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-1">
                  <div>
                    <Label>Observação</Label>
                    <TextArea
                      placeholder="Escreva a observação"
                      value={formData.observacao}
                      onChange={(e) => setFormData({ ...formData, observacao: e })}
                    />

                  </div>
                </div>
                <div>
                  <Label>Status</Label>
                  <Select
                    options={options}
                    placeholder="Selecione um status"
                    onChange={handleSelectChange}
                    className="dark:bg-dark-900"
                  />
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
                Salvar
              </button>
            </div>
          </form>
        </div>
      </Modal>

      <div className="space-y-6">
        <BasicTableOne />
      </div>
    </>
  );
}
