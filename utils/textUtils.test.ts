
import { describe, it, expect } from 'vitest';
import { convertTextToUK } from './textUtils';

describe('convertTextToUK', () => {
  it('converts singular terms correctly', () => {
    expect(convertTextToUK('single crochet')).toBe('double crochet');
    expect(convertTextToUK('double crochet')).toBe('treble crochet');
    expect(convertTextToUK('half double crochet')).toBe('half treble crochet');
    expect(convertTextToUK('treble crochet')).toBe('double treble crochet');
    expect(convertTextToUK('yarn over')).toBe('yarn round hook');
    expect(convertTextToUK('sc')).toBe('dc');
    expect(convertTextToUK('dc')).toBe('tr');
    expect(convertTextToUK('hdc')).toBe('htr');
    expect(convertTextToUK('tr')).toBe('dtr');
    expect(convertTextToUK('yo')).toBe('yrh');
  });

  it('preserves casing', () => {
    expect(convertTextToUK('Single crochet')).toBe('Double crochet');
    expect(convertTextToUK('Double Crochet')).toBe('Treble crochet');
    expect(convertTextToUK('SC')).toBe('DC');
  });

  it('converts plural terms correctly (Bug Reproduction)', () => {
    // These tests are expected to FAIL currently
    expect(convertTextToUK('single crochets')).toBe('double crochets');
    expect(convertTextToUK('double crochets')).toBe('treble crochets');
    expect(convertTextToUK('yarn overs')).toBe('yarn round hooks');
    expect(convertTextToUK('scs')).toBe('dcs');
    expect(convertTextToUK('dcs')).toBe('trs');
  });

  it('handles terms within sentences', () => {
    expect(convertTextToUK('Make 2 single crochets in the next stitch')).toBe('Make 2 double crochets in the next stitch');
    expect(convertTextToUK('Work a dc then a sc')).toBe('Work a tr then a dc');
  });
});
