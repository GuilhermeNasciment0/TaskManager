import React, { useState, useEffect } from 'react';
import { Trash2, CheckCircle2, Circle } from 'lucide-react';

export default function TaskListSimples() {
  // Hook useState e Callback (lazy initialization) para buscar os dados iniciais do localStorage
  const [tarefas, setTarefas] = useState(() => {
    const tarefasSalvas = localStorage.getItem('tarefas');
    return tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
  });
  // Hooks useState para gerenciar os diferentes estados do componente
  const [filtro, setFiltro] = useState('todas');
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [descricao, setDescricao] = useState('');
  const [prioridade, setPrioridade] = useState('média');

  // Hook useEffect recebendo um Callback para salvar no localStorage quando 'tarefas' mudar
  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas]);

  function adicionarTarefa(evento) {
    evento.preventDefault();

    if (!nome || !data || !descricao) {
      alert('Preencha todos os campos!');
      return;
    }

    const novaTarefa = {
      id: Date.now(),
      nome: nome,
      data: data,
      descricao: descricao,
      prioridade: prioridade,
      concluida: false
    };

    setTarefas([novaTarefa, ...tarefas]);
    setNome('');
    setData('');
    setDescricao('');
    setPrioridade('média');
  }

  function marcarConcluida(id) {
    setTarefas(
      // Método map recebendo um Callback para iterar e alterar a propriedade 'concluida'
      tarefas.map(tarefa =>
        tarefa.id === id 
          ? { ...tarefa, concluida: !tarefa.concluida }
          : tarefa
      )
    );
  }

  function deletarTarefa(id) {
    // Método filter recebendo um Callback para remover a tarefa correspondente ao ID
    setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
  }

  function obterTarefasFiltradas() {
    if (filtro === 'pendentes') {
      // Método filter recebendo um Callback para retornar apenas tarefas não concluídas
      return tarefas.filter(t => !t.concluida);
    }
    if (filtro === 'concluidas') {
      // Método filter recebendo um Callback para retornar apenas tarefas concluídas
      return tarefas.filter(t => t.concluida);
    }
    return tarefas;
  }

  function obterCorPrioridade(prio) {
    if (prio === 'alta') return 'bg-red-100 text-red-800';
    if (prio === 'média') return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  }
  
  const tarefasFiltradas = obterTarefasFiltradas();
  const total = tarefas.length;
  // Método filter recebendo um Callback para contabilizar o número de pendentes
  const pendentes = tarefas.filter(t => !t.concluida).length;
  // Método filter recebendo um Callback para contabilizar o número de concluídas
  const concluidas = tarefas.filter(t => t.concluida).length;

  return (
    <div className="min-h-screen bg-radial from-fuchsia-700 from-20% to-gray-900 p-6" >
      <div className="max-w-3xl mx-auto">
        
        <div className="mb-8 text-center">
          <h1 className="text-6xl font-bold text-white mb-2">
            📋 Minhas Tarefas
          </h1>
          <p className="text-blue-100">
            TaskManager - Gerenciador de tarefas
          </p>
        </div>

        <div className="bg-stone-950 rounded-lg shadow-lg p-6 mb-8 border border-purple-700">
          <h2 className="text-2xl font-bold text-white mb-4" id='AddTarefa'>
            ➕ Adicionar Nova Tarefa
          </h2>

          <form onSubmit={adicionarTarefa} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Nome da Tarefa
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Desenvolver um diagrama DER"
                className="w-full px-4 py-2 border border-purple-700 bg-zinc-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Data
              </label>
              <input
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="w-full px-4 py-2 border border-purple-700 bg-zinc-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Campo: Descrição */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Descrição
              </label>
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descreva a tarefa em detalhes..."
                rows="3"
                className="w-full px-4 py-2 border border-purple-700 bg-zinc-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Nível de Prioridade
              </label>
              <select
                value={prioridade}
                onChange={(e) => setPrioridade(e.target.value)}
                className="w-full px-4 py-2 border border-purple-700 bg-zinc-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="baixa">🟢 Baixa</option>
                <option value="média">🟡 Média</option>
                <option value="alta">🔴 Alta</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              ✅ Adicionar Tarefa
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFiltro('todas')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filtro === 'todas'
                  ? 'bg-purple-700 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-400'
              }`}
            >
              📋 Todas ({total})
            </button>
            
            <button
              onClick={() => setFiltro('pendentes')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filtro === 'pendentes'
                  ? 'bg-purple-700 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-400'
              }`}
            >
              ⏳ Pendentes ({pendentes})
            </button>
            
            <button
              onClick={() => setFiltro('concluidas')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filtro === 'concluidas'
                  ? 'bg-purple-700 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-400'
              }`}
            >
              ✅ Concluídas ({concluidas})
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {tarefasFiltradas.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <p className="text-gray-500 text-lg">
                {total === 0 
                  ? '📭 Nenhuma tarefa cadastrada' 
                  : '✨ Nenhuma tarefa neste filtro'}
              </p>
            </div>
          ) : (
            tarefasFiltradas.map((tarefa) => (
              <div
                key={tarefa.id}
                className={`bg-white rounded-lg shadow-lg p-4 border-l-4 transition-all ${
                  tarefa.concluida
                    ? 'border-l-green-500 opacity-75'
                    : 'border-l-pink-500'
                }`}
              >
                <div className="flex items-start gap-4">
                  
                  <button
                    onClick={() => marcarConcluida(tarefa.id)}
                    className="mt-1 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    {tarefa.concluida ? (
                      <CheckCircle2 size={24} className="text-green-500" />
                    ) : (
                      <Circle size={24} />
                    )}
                  </button>

                  <div className="flex-grow">
                    <h3 className={`text-lg font-bold ${
                      tarefa.concluida
                        ? 'text-gray-400 line-through'
                        : 'text-gray-800'
                    }`}>
                      {tarefa.nome}
                    </h3>
                    
                    <p className={`text-sm mt-2 ${
                      tarefa.concluida
                        ? 'text-gray-400'
                        : 'text-gray-600'
                    }`}>
                      {tarefa.descricao}
                    </p>

                    <div className="flex gap-2 mt-3 flex-wrap items-center">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        📅 {tarefa.data}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded font-medium ${obterCorPrioridade(tarefa.prioridade)}`}>
                        {tarefa.prioridade.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => deletarTarefa(tarefa.id)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {tarefas.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-lg p-4 text-center text-gray-600">
            <p>
              ✅ <strong>{concluidas}</strong> de <strong>{total}</strong> tarefas concluídas
            </p>
            <p className="text-sm mt-2">
              💾 Dados salvos automaticamente no storage local!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
