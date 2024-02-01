
export function ShowMoreStays({ onLoadMore }) {


    return (
        <section className="show-more-container">
            <span>Continue exploring more great stays</span>
            <button onClick={onLoadMore}>Show more</button>
        </section>

    )

}