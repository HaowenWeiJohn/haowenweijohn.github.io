export type MusicItem = {
  title: string
  context?: string
  youtubeId: string
}

export const musicIntro = `Music has always been a meaningful part of my life. 🎼 I'm especially passionate about the piano — it's where I feel most at home. 🎹 To me, music is a universal language, capable of expressing emotions and ideas that words sometimes can't.

During college I made it a tradition to perform once a year. Each performance helped me grow as both a musician and a person, deepening my love for the art. One composer who has had a lasting influence on me is Frédéric Chopin — his music, filled with emotion and technical beauty, speaks to me in a way that's hard to put into words.

I hope you enjoy listening. 🎧`

export const music: MusicItem[] = [
  { title: 'Chopin — "Revolutionary" Etude, Op. 10 No. 12',                                 youtubeId: 'XgsGGEtzoWQ' },
  { title: 'Chopin — Waltz in C-sharp minor, Op. 64 No. 2 (Veronica Yen version reference)', youtubeId: 'Mwau3yRSbIQ' },
  { title: 'Sonatina — age 9 (2010)',                                                         youtubeId: 'v_5i2BeGnDY' },
  { title: 'Chopin — Waltz in C-sharp minor, Op. 64 No. 2', context: 'WPI Alden Memorial, Spring 2019', youtubeId: 'gASYh_7J4hM' },
  { title: 'Live Improvised Piano', context: 'Restaurant in Manhattan, NY',                  youtubeId: 'bMFZHyg114E' },
  { title: 'Pachelbel — Canon in D Major',                                                   youtubeId: '6SSijmVIiQo' },
]
