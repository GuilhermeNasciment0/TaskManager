import React from 'react'

const Header = () => {
  return (
        <header class="text-gray-600 body-font bg-black">
          <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center border-purple-500 border-b max-w-svw">
            <a class="flex title-font font-medium items-center text-gray-900 ml-10 mb-4 md:mb-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 rounded-full bg-purple-700" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span class="ml-3 text-xl text-purple-700">Task Manager</span>
            </a>
            <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
              <a href='#AddTarefa' class="mr-5 hover:text-gray-900">Gerenciar Tarefas</a>
            </nav>
            <a href='https://www.linkedin.com/in/guilherme-caiano-1a329b30b/' target="_blank" class="inline-flex items-center bg-purple-700 border-0 py-1 px-3 focus:outline-none hover:bg-purple-900 rounded text-base text-white font-bold mt-4 md:mt-0">Confira nosso post
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </header>
  )
}

export default Header