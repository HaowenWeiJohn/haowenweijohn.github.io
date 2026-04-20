export type NavItem =
  | { label: string; to: string; external?: false }
  | { label: string; href: string; external: true }

export const site = {
  name: 'Haowen "John" Wei',
  shortName: 'Haowen Wei',
  affiliation: 'Massachusetts Institute of Technology',
  location: 'Boston, MA',
  avatar: '/images/avatar.png',
  socials: {
    email: 'hw2892@columbia.edu',
    github: 'https://github.com/HaowenWeiJohn',
    scholar: 'https://scholar.google.com/citations?user=phrai3MAAAAJ&hl=en',
    linkedin: 'https://www.linkedin.com/in/haowen-wei-7104bb1b1/',
  },
  nav: [
    { label: 'Home',         to: '/' },
    { label: 'Projects',     to: '/projects' },
    { label: 'Publications', to: '/publications' },
    { label: 'Music',        to: '/music' },
    { label: 'CV',           href: '/files/HaowenJohnWei_CV.pdf', external: true },
  ] satisfies NavItem[],
}
