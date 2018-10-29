export const navItems = [
  {
    name: 'Profili',
    url: '/profili',
    icon: 'icon-control-play',
    children: [
      {
        name: 'Profili im',
        url: '/profili/myProfile',
        icon: 'icon-user'
      },
      // {
      //   name: 'Aktiviteti im',
      //   url: '/profili/myActivities',
      //   icon: 'icon-star'
      // },
      // {
      //   name: 'Njoftime',
      //   url: '/profili/notifications',
      //   icon: 'icon-bell'
      // }
    ]
  },
  {
    name: 'Postime',
    url: '/postime',
    icon: 'icon-control-play',
    children: [
      {
        name: 'Shpërndaj',
        url: '/postime',
        icon: 'icon-cursor'
      },
      {
        name: 'Komento',
        url: '/postime/lexo&komento',
        icon: 'icon-pencil'
      }

    ]
  }
];
export const AdminNavItems = [
  {
    name: 'Krijo Postime',
    url: '/actions',
    icon: 'icon-control-play',
    children: [
      {
        name: 'Shpërndaj',
        icon: 'icon-cursor',
        url: '/actions'
      },
      {
        name: 'Lexo & Komento',
        icon: 'icon-pencil',
        url: '/actions/readAndComment'
      },
      // {
      //   name: 'Aprovo Komente',
      //   icon: 'icon-speedometer',
      //   url: '/actions/approveComments'
      // },
      {
        name: 'Menaxho Postime',
        icon: 'icon-speedometer',
        url: '/actions/managePosts'

      }
    ]
  },
  {
    name: 'Shiko Postime',
    url: '/postime',
    icon: 'icon-control-play',
    children: [
      {
        name: 'Postime Share',
        url: '/postime',
        icon: 'icon-cursor'
      },
      {
        name: 'Lexo & Komento',
        url: '/postime/lexo&komento',
        icon: 'icon-pencil'
      }

    ]
  }
]

export const SuperAdminNavItems = [
  {
    name: 'Krijo Postime',
    url: '/actions',
    icon: 'icon-control-play',
    children: [
      {
        name: 'Shpërndaj',
        icon: 'icon-cursor',
        url: '/actions'
      },
      {
        name: 'Lexo & Komento',
        icon: 'icon-pencil',
        url: '/actions/readAndComment'
      },
      // {
      //   name: 'Aprovo Komente',
      //   icon: 'icon-speedometer',
      //   url: '/actions/approveComments'
      // },
      {
        name: 'Menaxho Postime',
        icon: 'icon-speedometer',
        url: '/actions/managePosts'
      }
    ]
  },
  {
    name: 'Users',
    url: '/users',
    icon: 'icon-control-play',
    children: [
      {
        name: 'Menaxho përdoruesit',
        url: '/users',
        icon: 'icon-people'
      },
      {
        name: 'Raporti Total',
        icon: 'icon-people',
        url: '/users/dashboard'
      },
      {
        name: 'Mirëqeverisja',
        url: '/users/mireqeverisja',
        icon: 'icon-people'
      },
      {
        name: 'PS',
        url: '/users/ps',
        icon: 'icon-people'
      },
      {
        name: 'FRESSH',
        url: '/users/fressh',
        icon: 'icon-people'
      },
      /*  {
         name: 'Njoftime',
         url: '/users/insights',
         icon: 'icon-bell'
       } */
    ]
  },
  {
    name: 'Shiko Postime',
    url: '/postime',
    icon: 'icon-control-play',
    children: [
      {
        name: 'Postime Share',
        url: '/postime',
        icon: 'icon-cursor'
      },
      {
        name: 'Lexo & Komento',
        url: '/postime/lexo&komento',
        icon: 'icon-pencil'
      }

    ]
  }
]
