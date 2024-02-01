
export function ShowMoreStays({ onLoadMore }) {


    return (
        <section className="show-more-container">
            <span>Continue exploring desert homes</span>
            <button onClick={onLoadMore}>Show more</button>
        </section>

    )

}