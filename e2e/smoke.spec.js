import { test, expect } from '@playwright/test';

test.describe('关键入口冒烟验证', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('h1');
  });

  test('首页加载 - 应显示应用标题和比色记录标签', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('牙色比色记录');
    const recordsTab = page.locator('.tab', { hasText: '比色记录' });
    await expect(recordsTab).toBeVisible();
  });

  test('新增比色记录 - 填写表单并提交', async ({ page }) => {
    const patientInput = page.locator('input[placeholder="林雨"]');
    await patientInput.fill('冒烟测试患者');

    const toothSelect = page.locator('select').nth(1);
    await toothSelect.selectOption('11');

    const shadeSelect = page.locator('select').nth(2);
    await shadeSelect.selectOption('A2');

    const submitBtn = page.locator('button.primary[type="submit"]', { hasText: '新增' });
    await submitBtn.click();

    const newRecord = page.locator('.record', { hasText: '冒烟测试患者' });
    await expect(newRecord).toBeVisible({ timeout: 5000 });
  });

  test('切换到数据管理页 - 显示数据模型状态和导出按钮', async ({ page }) => {
    const dataMgmtTab = page.locator('.tab', { hasText: '数据管理' });
    await dataMgmtTab.click();

    await expect(page.locator('h2', { hasText: '数据模型状态' })).toBeVisible();
    await expect(page.locator('h2', { hasText: '完整备份导出' })).toBeVisible();
  });

  test('导出备份 - 点击导出按钮触发下载', async ({ page }) => {
    const dataMgmtTab = page.locator('.tab', { hasText: '数据管理' });
    await dataMgmtTab.click();

    const exportBtn = page.locator('button.primary', { hasText: '导出完整备份包' });
    await expect(exportBtn).toBeVisible();

    const [download] = await Promise.all([
      page.waitForEvent('download', { timeout: 10000 }),
      exportBtn.click(),
    ]);

    expect(download.suggestedFilename()).toMatch(/dental-full-backup-.*\.json/);
  });

  test('多诊室协作页加载 - 协作时间线在数据管理页正确展示', async ({ page }) => {
    const dataMgmtTab = page.locator('.tab', { hasText: '数据管理' });
    await dataMgmtTab.click();

    await expect(page.locator('span', { hasText: /^协作时间线$/ })).toBeVisible();
  });

  test('其他标签页加载验证', async ({ page }) => {
    const tabs = [
      { label: '今日复诊', heading: '今日复诊清单' },
      { label: '患者档案', heading: '新增患者档案' },
      { label: '牙色样本库', heading: '色号列表' },
      { label: '拍照流程', heading: '拍照流程总数' },
      { label: '技工所交接单', heading: '交接单总数' },
      { label: '复诊排期看板', heading: '逾期复诊' },
    ];

    for (const tab of tabs) {
      const tabBtn = page.locator('.tab', { hasText: tab.label });
      await tabBtn.click();
      await expect(page.locator(`text=${tab.heading}`).first()).toBeVisible({ timeout: 5000 });
    }
  });
});
