import { describe, it, expect } from 'vitest'
import { publications } from '../publications'
import { music } from '../music'

describe('publications', () => {
  it('has unique slugs', () => {
    const slugs = publications.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('has valid ISO dates', () => {
    for (const p of publications) {
      expect(Number.isNaN(new Date(p.date).getTime())).toBe(false)
    }
  })

  it('year is within 1 year of the date year', () => {
    for (const p of publications) {
      const dateYear = new Date(p.date).getUTCFullYear()
      expect(p.year).toBeGreaterThanOrEqual(dateYear - 1)
    }
  })
})

describe('music', () => {
  it('has YouTube IDs of expected length (11 chars, URL-safe)', () => {
    const idPattern = /^[a-zA-Z0-9_-]{11}$/
    for (const m of music) {
      expect(m.youtubeId).toMatch(idPattern)
    }
  })
})
