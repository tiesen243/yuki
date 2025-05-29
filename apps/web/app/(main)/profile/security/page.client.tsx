'use client'

import { useRouter } from 'next/navigation'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@yuki/ui/alert-dialog'
import { Button } from '@yuki/ui/button'
import { Checkbox } from '@yuki/ui/checkbox'
import { useForm } from '@yuki/ui/form'
import { Input } from '@yuki/ui/input'
import { toast } from '@yuki/ui/sonner'
import { changePasswordSchema } from '@yuki/validators/auth'

import { useTRPC } from '@/lib/trpc/react'

export const ChangePasswordForm: React.FC = () => {
  const { trpcClient } = useTRPC()
  const router = useRouter()

  const form = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      isLogoutAll: false,
    },
    validator: changePasswordSchema,
    onSubmit: trpcClient.auth.changePassword.mutate,
    onSuccess: () => {
      toast.success('Password changed successfully!')
      router.push('/')
    },
    onError: (error) => toast.error(error.message),
  })

  return (
    <form
      className="mt-4 grid gap-4"
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <form.Field
        name="currentPassword"
        render={({ field, meta }) => (
          <div id={meta.id} className="grid gap-1">
            <form.Label>Current Password</form.Label>
            <form.Control {...field}>
              <Input type="password" placeholder="Current Password" />
            </form.Control>
            <form.Description>
              Leave this field empty if your current password is not set.
            </form.Description>
            <form.Message />
          </div>
        )}
      />

      <form.Field
        name="newPassword"
        render={({ field, meta }) => (
          <div id={meta.id} className="grid gap-1">
            <form.Label>New Password</form.Label>
            <form.Control {...field}>
              <Input type="password" placeholder="New Password" />
            </form.Control>
            <form.Message />
          </div>
        )}
      />

      <form.Field
        name="confirmNewPassword"
        render={({ field, meta }) => (
          <div id={meta.id} className="grid gap-1">
            <form.Label>Confirm New Password</form.Label>
            <form.Control {...field}>
              <Input type="password" placeholder="Confirm New Password" />
            </form.Control>
            <form.Message />
          </div>
        )}
      />

      <form.Field
        name="isLogoutAll"
        render={({ field }) => (
          <div className="flex items-center gap-2">
            <form.Control>
              <Checkbox
                name={field.name}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </form.Control>
            <form.Label>Logout from all devices</form.Label>
          </div>
        )}
      />

      <Button disabled={form.state.isPending}>Save Changes</Button>
    </form>
  )
}

export const DeleteAccountButton: React.FC = () => {
  const { trpcClient } = useTRPC()
  const router = useRouter()

  const form = useForm({
    defaultValues: {
      confirmDeletion: '',
    },
    validator: (value) => {
      if (value.confirmDeletion !== 'Delete my account')
        return {
          issues: [
            {
              path: ['confirmDeletion'],
              message: 'You must type "Delete my account" to confirm.',
            },
          ],
        }
      return { value }
    },
    onSubmit: () => trpcClient.auth.removeAccount.mutate(),
    onSuccess: () => {
      toast.success('Account deleted successfully!')
      router.push('/')
    },
    onError: (error) => toast.error(error.message),
  })

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="lg" className="mt-4 w-full">
          Delete Account
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete your account?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action is irreversible and will permanently delete your account
            and all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form.Field
          name="confirmDeletion"
          render={({ field, meta }) => (
            <div id={meta.id} className="grid gap-1">
              <form.Label>
                Type <strong>Delete my account</strong> to confirm
              </form.Label>
              <form.Control {...field}>
                <Input placeholder="Delete my account" className="w-full" />
              </form.Control>
              <form.Message />
            </div>
          )}
        />

        <AlertDialogFooter>
          <AlertDialogCancel disabled={form.state.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={form.handleSubmit}
            disabled={form.state.isPending}
          >
            Confirm Deletion
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
