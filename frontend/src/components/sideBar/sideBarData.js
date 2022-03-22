import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as GiIcons from 'react-icons/gi';
import * as CgIcons from 'react-icons/cg';

export const SidebarData = [
  {
    title: 'Pagina Inicial',
    path: '/main',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Registrar Valor',
    path: '/registrar-valor',
    icon: <GiIcons.GiArchiveRegister />,
    cName: 'nav-text'
  },
  {
    title: 'Perfil',
    path: '/perfil',
    icon: <CgIcons.CgProfile />,
    cName: 'nav-text'
  },
];

