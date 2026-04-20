export type MusicItem = {
  title: string
  context?: string
  youtubeId: string
}

export const musicIntro = `Music has always been an important part of my life. 🎼 I am especially passionate about the piano, which is where I feel most at home. 🎹 To me, music is a universal language that can express emotions and ideas beyond what words can capture.

During college, I made it a tradition to perform once a year. Each performance helped me grow not only as a musician, but also as a person, and deepened my love for the art. Frédéric Chopin has had a particularly lasting influence on me. His music, with its emotional depth and technical beauty, moves me in a way that few other composers can.

I hope you enjoy listening. 🎧`

export const music: MusicItem[] = [
  { title: 'Chopin — "Revolutionary" Etude, Op. 10 No. 12',                                 youtubeId: 'XgsGGEtzoWQ' },
  { title: 'Chopin — Waltz in C-sharp minor, Op. 64 No. 2 (Veronica Yen version reference)', youtubeId: 'Mwau3yRSbIQ' },
  { title: 'Sonatina — age 9 (2010)',                                                         youtubeId: 'v_5i2BeGnDY' },
  { title: 'Chopin — Waltz in C-sharp minor, Op. 64 No. 2', context: 'WPI Alden Memorial, Spring 2019', youtubeId: 'gASYh_7J4hM' },
  { title: 'Live Improvised Piano', context: 'Restaurant in Manhattan, NY',                  youtubeId: 'bMFZHyg114E' },
  { title: 'Pachelbel — Canon in D Major',                                                   youtubeId: '6SSijmVIiQo' },
]
