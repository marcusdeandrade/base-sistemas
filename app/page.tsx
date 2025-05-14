'use client';

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { databases } from "@/lib/appwrite";
import { ID } from "appwrite";
import { PageContent } from "@/components/PageContent";
import { ContentCard } from "@/components/ContentCard";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    complement: "",
    city: "",
    state: "",
    zipCode: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await databases.createDocument(
        "68240fd9002f4552cb8b", // Database ID
        "addresses4", // Collection ID
        ID.unique(),
        formData
      );

      // Reset form after successful submission
      setFormData({
        name: "",
        address: "",
        complement: "",
        city: "",
        state: "",
        zipCode: ""
      });

      alert("Endereço adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar endereço:", error);
      alert("Erro ao adicionar endereço. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <PageContent
      title="Cadastro de Endereço"
      subtitle="Preencha os dados para adicionar um novo endereço"
    >
      <ContentCard className="w-full max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="font-medium">Nome</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Digite seu nome"
                  className="focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="zipCode" className="font-medium">CEP</Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="Digite seu CEP"
                  className="focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5 md:col-span-2">
                <Label htmlFor="address" className="font-medium">Endereço</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Digite seu endereço"
                  className="focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="complement" className="font-medium">Complemento</Label>
                <Input
                  id="complement"
                  name="complement"
                  value={formData.complement}
                  onChange={handleChange}
                  placeholder="Apartamento, sala, etc."
                  className="focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="city" className="font-medium">Cidade</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Digite sua cidade"
                  className="focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="state" className="font-medium">Estado</Label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Digite seu estado"
                  className="focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2 border-t bg-gray-50/50 px-6 py-4">
            <Button disabled={loading}>
              {loading ? "Salvando..." : "Salvar Endereço"}
            </Button>
          </CardFooter>
        </form>
      </ContentCard>
    </PageContent>
  );
}
