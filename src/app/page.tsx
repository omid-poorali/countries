import { Routes } from '@/constants';
import { redirect } from 'next/navigation';

export default async function Page() {
  return redirect(Routes.COUNTRIES)

}