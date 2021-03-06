import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
	{
		name: 'Dashboard',
		url: '/dashboard',
		icon: 'icon-speedometer'
		// badge: {
		//   variant: 'info',
		//   text: 'NEW'
		// }
	},
	{
		title: true,
		name: 'Details'
	},
	{
		name: 'Company',
		url: '/company_details',
		icon: 'icon-home'
	},
	{
		name: 'Employees',
		url: '/employee_listing',
		icon: 'icon-lock'
	},
	{
		name: 'Customers',
		url: '/customer_listing',
		icon: 'icon-emotsmile'
	},
	{
		name: 'Suppliers',
		url: '/supplier_listing',
		icon: 'icon-lock'
	},
	{
		name: 'Invoices',
		url: '/receipts',
		icon: 'icon-puzzle',
		children: [
			{
				name: 'Sale Invoices',
				url: '/receipts/sale_invoice_listing',
				icon: 'icon-puzzle'
			}
			// {
			// 	name: 'Cash Memo',
			// 	url: '/receipts/cash_memos',
			// 	icon: 'icon-puzzle'
			// }
		]
	},
	{
		name: 'Masters',
		url: '/masters',
		icon: 'icon-puzzle',
		children: [
			{
				name: 'Product Master',
				url: '/masters/product_master',
				icon: 'icon-puzzle'
			},
			{
				name: 'Bank Master',
				url: '/masters/bank_master',
				icon: 'icon-puzzle'
			}
		]
	},
	{
		name: 'Stock',
		url: '/stocks',
		icon: 'icon-lock',
		children: [
			{
				name: 'Raw Cashew',
				url: '/base/cards',
				icon: 'icon-puzzle'
			},
			{
				name: 'Processed Cashew',
				url: '/base/cards',
				icon: 'icon-puzzle'
			},
			{
				name: 'Inventory',
				url: '/base/carousels',
				icon: 'icon-puzzle'
			}
		]
	}
	// {
	//   name: 'Colors',
	//   url: '/theme/colors',
	//   icon: 'icon-drop'
	// },
	// {
	//   name: 'Typography',
	//   url: '/theme/typography',
	//   icon: 'icon-pencil'
	// },
	// {
	//   title: true,
	//   name: 'Reports'
	// },
	// {
	//   name:'Receipts',
	//   url:'/company_details',
	//   icon:'icon-speedometer'
	// },
	// {
	//   name: 'Base',
	//   url: '/base',
	//   icon: 'icon-puzzle',
	//   children: [
	//     {
	//       name: 'Cards',
	//       url: '/base/cards',
	//       icon: 'icon-puzzle'
	//     },
	//     {
	//       name: 'Carousels',
	//       url: '/base/carousels',
	//       icon: 'icon-puzzle'
	//     },
	//     {
	//       name: 'Collapses',
	//       url: '/base/collapses',
	//       icon: 'icon-puzzle'
	//     },
	//     {
	//       name: 'Forms',
	//       url: '/base/forms',
	//       icon: 'icon-puzzle'
	//     },
	//     {
	//       name: 'Navbars',
	//       url: '/base/navbars',
	//       icon: 'icon-puzzle'

	//     },
	//     {
	//       name: 'Pagination',
	//       url: '/base/paginations',
	//       icon: 'icon-puzzle'
	//     },
	//     {
	//       name: 'Popovers',
	//       url: '/base/popovers',
	//       icon: 'icon-puzzle'
	//     },
	//     {
	//       name: 'Progress',
	//       url: '/base/progress',
	//       icon: 'icon-puzzle'
	//     },
	//     {
	//       name: 'Switches',
	//       url: '/base/switches',
	//       icon: 'icon-puzzle'
	//     },
	//     {
	//       name: 'Tables',
	//       url: '/base/tables',
	//       icon: 'icon-puzzle'
	//     },
	//     {
	//       name: 'Tabs',
	//       url: '/base/tabs',
	//       icon: 'icon-puzzle'
	//     },
	//     {
	//       name: 'Tooltips',
	//       url: '/base/tooltips',
	//       icon: 'icon-puzzle'
	//     }
	//   ]
	// },
	// {
	//   name: 'Buttons',
	//   url: '/buttons',
	//   icon: 'icon-cursor',
	//   children: [
	//     {
	//       name: 'Buttons',
	//       url: '/buttons/buttons',
	//       icon: 'icon-cursor'
	//     },
	//     {
	//       name: 'Dropdowns',
	//       url: '/buttons/dropdowns',
	//       icon: 'icon-cursor'
	//     },
	//     {
	//       name: 'Brand Buttons',
	//       url: '/buttons/brand-buttons',
	//       icon: 'icon-cursor'
	//     }
	//   ]
	// },
	// {
	//   name: 'Charts',
	//   url: '/charts',
	//   icon: 'icon-pie-chart'
	// },
	// {
	//   name: 'Icons',
	//   url: '/icons',
	//   icon: 'icon-star',
	//   children: [
	//     {
	//       name: 'CoreUI Icons',
	//       url: '/icons/coreui-icons',
	//       icon: 'icon-star',
	//       badge: {
	//         variant: 'success',
	//         text: 'NEW'
	//       }
	//     },
	//     {
	//       name: 'Flags',
	//       url: '/icons/flags',
	//       icon: 'icon-star'
	//     },
	//     {
	//       name: 'Font Awesome',
	//       url: '/icons/font-awesome',
	//       icon: 'icon-star',
	//       badge: {
	//         variant: 'secondary',
	//         text: '4.7'
	//       }
	//     },
	//     {
	//       name: 'Simple Line Icons',
	//       url: '/icons/simple-line-icons',
	//       icon: 'icon-star'
	//     }
	//   ]
	// },
	// {
	//   name: 'Notifications',
	//   url: '/notifications',
	//   icon: 'icon-bell',
	//   children: [
	//     {
	//       name: 'Alerts',
	//       url: '/notifications/alerts',
	//       icon: 'icon-bell'
	//     },
	//     {
	//       name: 'Badges',
	//       url: '/notifications/badges',
	//       icon: 'icon-bell'
	//     },
	//     {
	//       name: 'Modals',
	//       url: '/notifications/modals',
	//       icon: 'icon-bell'
	//     }
	//   ]
	// },
	// {
	//   name: 'Widgets',
	//   url: '/widgets',
	//   icon: 'icon-calculator',
	//   badge: {
	//     variant: 'info',
	//     text: 'NEW'
	//   }
	// },
	// {
	//   divider: true
	// },
	// {
	//   title: true,
	//   name: 'Extras',
	// },
	// {
	//   name: 'Pages',
	//   url: '/pages',
	//   icon: 'icon-star',
	//   children: [
	//     {
	//       name: 'Login',
	//       url: '/login',
	//       icon: 'icon-star'
	//     },
	//     {
	//       name: 'Register',
	//       url: '/register',
	//       icon: 'icon-star'
	//     },
	//     {
	//       name: 'Error 404',
	//       url: '/404',
	//       icon: 'icon-star'
	//     },
	//     {
	//       name: 'Error 500',
	//       url: '/500',
	//       icon: 'icon-star'
	//     }
	//   ]
	// },
	// {
	//   name: 'Disabled',
	//   url: '/dashboard',
	//   icon: 'icon-ban',
	//   badge: {
	//     variant: 'secondary',
	//     text: 'NEW'
	//   },
	//   attributes: { disabled: true },
	// },
	// {
	//   name: 'Download CoreUI',
	//   url: 'http://coreui.io/angular/',
	//   icon: 'icon-cloud-download',
	//   class: 'mt-auto',
	//   variant: 'success',
	//   attributes: { target: '_blank', rel: 'noopener' }
	// },
	// {
	//   name: 'Try CoreUI PRO',
	//   url: 'http://coreui.io/pro/angular/',
	//   icon: 'icon-layers',
	//   variant: 'danger',
	//   attributes: { target: '_blank', rel: 'noopener' }
	// }
];
