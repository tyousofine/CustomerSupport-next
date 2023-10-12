

export async function GET(req) {
    console.log(req.body)
    const url = new URL(req.url)

    const code = url.searchParams.get('code')
}