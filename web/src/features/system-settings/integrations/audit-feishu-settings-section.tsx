import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as z from 'zod'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

import {
  SettingsControlGroup,
  SettingsForm,
  SettingsSwitchField,
} from '../components/settings-form-layout'
import { SettingsPageFormActions } from '../components/settings-page-context'
import { SettingsSection } from '../components/settings-section'
import { useResetForm } from '../hooks/use-reset-form'
import { useUpdateOption } from '../hooks/use-update-option'

const auditFeishuSchema = z.object({
  'audit_setting.enabled': z.boolean(),
  'audit_setting.sample_rate': z.string(),
  'audit_setting.max_request_bytes': z.string(),
  'audit_setting.max_response_bytes': z.string(),
  'audit_setting.retention_days': z.string(),
  'audit_setting.channel_ids': z.string(),
  'feishu_setting.enabled': z.boolean(),
  'feishu_setting.app_id': z.string(),
  'feishu_setting.app_secret': z.string(),
  'feishu_setting.app_token': z.string(),
  'feishu_setting.table_id': z.string(),
})

type AuditFeishuFormValues = z.infer<typeof auditFeishuSchema>

type AuditFeishuSettingsSectionProps = {
  defaultValues: AuditFeishuFormValues
}

const numberFields = [
  'audit_setting.sample_rate',
  'audit_setting.max_request_bytes',
  'audit_setting.max_response_bytes',
  'audit_setting.retention_days',
] as const

function toInt(
  values: AuditFeishuFormValues,
  key: (typeof numberFields)[number]
) {
  const parsed = Number.parseInt(values[key], 10)
  return Number.isFinite(parsed) ? parsed : 0
}

export function AuditFeishuSettingsSection({
  defaultValues,
}: AuditFeishuSettingsSectionProps) {
  const { t } = useTranslation()
  const updateOption = useUpdateOption()

  const form = useForm<AuditFeishuFormValues>({
    resolver: zodResolver(auditFeishuSchema),
    defaultValues,
  })

  useResetForm(form, defaultValues)

  const buildUpdates = (
    values: AuditFeishuFormValues,
    initial: AuditFeishuFormValues
  ): Array<{ key: string; value: string | boolean }> => {
    const updates: Array<{ key: string; value: string | boolean }> = []
    for (const key of Object.keys(values) as Array<
      keyof AuditFeishuFormValues
    >) {
      let next: string | boolean = values[key]
      if (numberFields.includes(key as (typeof numberFields)[number])) {
        next = String(toInt(values, key as (typeof numberFields)[number]))
      } else if (typeof next === 'string') {
        next = next.trim()
      }
      if (next !== initial[key]) {
        updates.push({ key, value: next })
      }
    }
    return updates
  }

  const onSubmit = async (values: AuditFeishuFormValues) => {
    const initial: AuditFeishuFormValues = {
      'audit_setting.enabled': defaultValues['audit_setting.enabled'],
      'audit_setting.sample_rate':
        defaultValues['audit_setting.sample_rate'].trim(),
      'audit_setting.max_request_bytes':
        defaultValues['audit_setting.max_request_bytes'].trim(),
      'audit_setting.max_response_bytes':
        defaultValues['audit_setting.max_response_bytes'].trim(),
      'audit_setting.retention_days':
        defaultValues['audit_setting.retention_days'].trim(),
      'audit_setting.channel_ids':
        defaultValues['audit_setting.channel_ids'].trim(),
      'feishu_setting.enabled': defaultValues['feishu_setting.enabled'],
      'feishu_setting.app_id': defaultValues['feishu_setting.app_id'].trim(),
      'feishu_setting.app_secret':
        defaultValues['feishu_setting.app_secret'].trim(),
      'feishu_setting.app_token':
        defaultValues['feishu_setting.app_token'].trim(),
      'feishu_setting.table_id':
        defaultValues['feishu_setting.table_id'].trim(),
    }
    const updates = buildUpdates(values, initial)
    for (const update of updates) {
      await updateOption.mutateAsync(update)
    }
  }

  return (
    <SettingsSection title={t('Content Audit & Feishu Sync')}>
      <Form {...form}>
        <SettingsForm onSubmit={form.handleSubmit(onSubmit)} autoComplete='off'>
          <SettingsPageFormActions
            onSave={form.handleSubmit(onSubmit)}
            isSaving={updateOption.isPending}
            saveLabel='Save audit and sync settings'
          />

          <FormField
            control={form.control}
            name='audit_setting.enabled'
            render={({ field }) => (
              <FormItem>
                <SettingsSwitchField
                  label={t('Enable content audit')}
                  description={t(
                    'Capture the raw request and response of text-generation relay calls (including tool calls) for admin audit. Store responsibly: captured content may contain user data.'
                  )}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormItem>
            )}
          />

          <SettingsControlGroup>
            <FormField
              control={form.control}
              name='audit_setting.sample_rate'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('Sample rate (%)')}</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      min={0}
                      max={100}
                      placeholder='100'
                      {...field}
                      onChange={(event) => field.onChange(event.target.value)}
                    />
                  </FormControl>
                  <FormDescription>
                    {t('Percentage of eligible calls to capture, 0-100.')}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='audit_setting.max_request_bytes'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('Max request bytes')}</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      min={0}
                      placeholder='32768'
                      {...field}
                      onChange={(event) => field.onChange(event.target.value)}
                    />
                  </FormControl>
                  <FormDescription>
                    {t('Larger request bodies are stored truncated.')}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='audit_setting.max_response_bytes'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('Max response bytes')}</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      min={0}
                      placeholder='65536'
                      {...field}
                      onChange={(event) => field.onChange(event.target.value)}
                    />
                  </FormControl>
                  <FormDescription>
                    {t('Larger responses are stored truncated.')}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='audit_setting.retention_days'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('Retention days')}</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      min={0}
                      placeholder='7'
                      {...field}
                      onChange={(event) => field.onChange(event.target.value)}
                    />
                  </FormControl>
                  <FormDescription>
                    {t(
                      'Records older than this are deleted automatically; 0 keeps them until cleaned manually.'
                    )}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='audit_setting.channel_ids'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('Channel ID allowlist')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('e.g. 1,5,12 (empty = all channels)')}
                      {...field}
                      onChange={(event) => field.onChange(event.target.value)}
                    />
                  </FormControl>
                  <FormDescription>
                    {t(
                      'Comma-separated channel IDs to limit capture to specific channels.'
                    )}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </SettingsControlGroup>

          <Separator />

          <FormField
            control={form.control}
            name='feishu_setting.enabled'
            render={({ field }) => (
              <FormItem>
                <SettingsSwitchField
                  label={t('Enable Feishu Bitable sync')}
                  description={t(
                    'Push new FDE appointment submissions to a Feishu Bitable (多维表格). The table needs text fields named 姓名 / 公司 / 职务 / 联系方式 / 业务场景 / 合作诉求 and a 提交时间 field.'
                  )}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormItem>
            )}
          />

          <SettingsControlGroup>
            <FormField
              control={form.control}
              name='feishu_setting.app_id'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('App ID')}</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete='off'
                      placeholder='cli_xxx'
                      {...field}
                      onChange={(event) => field.onChange(event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='feishu_setting.app_secret'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('App Secret')}</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete='off'
                      type='password'
                      {...field}
                      onChange={(event) => field.onChange(event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='feishu_setting.app_token'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('Bitable App Token')}</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete='off'
                      placeholder='bascnXXX'
                      {...field}
                      onChange={(event) => field.onChange(event.target.value)}
                    />
                  </FormControl>
                  <FormDescription>
                    {t(
                      'Found in the Bitable URL: /base/{app_token}?table={table_id}'
                    )}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='feishu_setting.table_id'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('Table ID')}</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete='off'
                      placeholder='tblXXX'
                      {...field}
                      onChange={(event) => field.onChange(event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </SettingsControlGroup>
        </SettingsForm>
      </Form>
    </SettingsSection>
  )
}
