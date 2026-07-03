export async function GET({ redirect, cookies }) {
  cookies.delete('session', { path: '/' });
  return redirect('/login');
}
