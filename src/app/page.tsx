import React from "react";

interface Persona {
  id: number;
  name: string;
  address: string;
  email: string;
  phone: string;
  birthDate: string;
}

const personaData: Persona[] = [
  {
    id: 1,
    name: "Juan García López",
    address: "Calle Principal 123",
    email: "juan.garcia@email.com",
    phone: "123456789",
    birthDate: "1990-05-15",
  },
  {
    id: 2,
    name: "María Rodríguez Martínez",
    address: "Avenida Central 456",
    email: "maria.rodriguez@email.com",
    phone: "966654321",
    birthDate: "1985-08-22",
  },
  {
    id: 3,
    name: "Laszlo Caballero Sipiran",
    address: "UPN",
    email: "laszlogey@hvon.com",
    phone: "987654321",
    birthDate: "2006-01-01",
  },
];

const Personas = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-7xl mx-auto">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Gestión de Personas
          </h1>
          <p className="text-sm text-gray-600">
            Administra la información de las personas en el sistema
          </p>
        </div>

        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <input
            type="text"
            placeholder="Buscar personas..."
            className="text-black border border-gray-300 px-4 py-2 rounded-md w-full sm:w-1/3"
          />
          <button className="bg-black text-white px-4 py-2 rounded-md flex items-center gap-2">
            <span className="text-lg">+</span> Agregar Persona
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="text-left px-4 py-2">ID</th>
                <th className="text-left px-4 py-2">Nombre Completo</th>
                <th className="text-left px-4 py-2">Email</th>
                <th className="text-left px-4 py-2">Teléfono</th>
                <th className="text-left px-4 py-2">Fecha Nacimiento</th>
                <th className="text-left px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {personaData.map((person) => (
                <tr key={person.id} className="border-t">
                  <td className="px-4 py-2">{person.id}</td>
                  <td className="px-4 py-2">
                    <div className="font-semibold">{person.name}</div>
                    <div className="text-gray-500 text-sm">
                      {person.address}
                    </div>
                  </td>
                  <td className="px-4 py-2">{person.email}</td>
                  <td className="px-4 py-2">{person.phone}</td>
                  <td className="px-4 py-2">{person.birthDate}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded">
                      ✏️
                    </button>
                    <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded">
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-sm text-gray-600 flex justify-between flex-wrap gap-2">
          <span>
            Mostrando {personaData.length} de {personaData.length} personas
          </span>
          <span>Total de registros: {personaData.length}</span>
        </div>
      </div>
    </div>
  );
};

export default Personas;
