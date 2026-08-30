export type NewsItem = {
  date: string   // ISO
  emoji?: string
  text: string   // markdown
}

export const news: NewsItem[] = [
  {
    date: '2025-07-01',
    emoji: '🔬',
    text: 'Started a new position as a **Research Associate** at the **MIT Institute for Medical Engineering and Science (IMES)** and the **MIT.nano Immersion Lab**.',
  },
  {
    date: '2024-09-06',
    emoji: '🏢',
    text: 'Began my new position as a **Research Assistant** at the **Martinos Center for Biomedical Imaging**, Harvard Medical School.',
  },
  {
    date: '2024-09-05',
    emoji: '📝',
    text: "Submitted a paper as a part of my Master's thesis to **CHI 2025**.",
  },
  {
    date: '2024-05-13',
    emoji: '🎓',
    text: 'Graduated from Columbia University with a Master of Science in Computer Science (Thesis Track).',
  },
  {
    date: '2024-05-01',
    emoji: '🥳',
    text: "Successfully defended my Master's thesis, *From Brain-Computer Interfaces to AI-Enhanced Diagnostics* ([paper](https://www.researchgate.net/publication/383876115_From_Brain-Computer_Interfaces_to_AI-Enhanced_Diagnostics_Developing_Cutting-Edge_Tools_for_Medical_and_Interactive_Technologies)), under the supervision of [Steven K. Feiner](https://www.engineering.columbia.edu/faculty/steven-feiner), [Paul Sajda](https://www.bme.columbia.edu/faculty/paul-sajda), and [Kaveri Thakoor](https://www.vagelos.columbia.edu/profile/kaveri-thakoor-phd).",
  },
]
