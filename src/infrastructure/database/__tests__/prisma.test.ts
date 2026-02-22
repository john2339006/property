import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock @prisma/client with a class so `new PrismaClient()` works
vi.mock('@prisma/client', () => {
    class MockPrismaClient {
        $connect = vi.fn();
        $disconnect = vi.fn();
        managementCompany = {};
        user = {};
        owner = {};
        house = {};
    }
    return { PrismaClient: MockPrismaClient };
});

describe('PrismaService', () => {
    beforeEach(() => {
        vi.resetModules();
        // Clean up the global singleton between tests
        const g = globalThis as unknown as { prisma: unknown };
        delete g.prisma;
    });

    it('should export a prisma instance', async () => {
        const { prisma } = await import('../prisma');
        expect(prisma).toBeDefined();
    });

    it('should return the same instance on repeated imports (singleton)', async () => {
        const mod1 = await import('../prisma');
        const mod2 = await import('../prisma');
        expect(mod1.prisma).toBe(mod2.prisma);
    });

    it('should have expected client methods', async () => {
        const { prisma } = await import('../prisma');
        expect(typeof prisma.$connect).toBe('function');
        expect(typeof prisma.$disconnect).toBe('function');
    });
});
