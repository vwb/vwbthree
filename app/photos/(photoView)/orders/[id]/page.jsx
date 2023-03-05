export default async function Page({ params }) {
    return (
        <>
            <main
                style={{
                    paddingTop: "60px",
                    maxWidth: "400px",
                    margin: "0 auto"
                }}
            >
                {params.id}
            </main>
        </>
    );
}
