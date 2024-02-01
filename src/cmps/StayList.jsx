import { StayPreview } from "./StayPreview.jsx"

export function StayList({ stays }) {

    return (
        <ul className="stay-list">
            {stays.map(stay =>
                <StayPreview
                    key={stay._id}
                    stay={stay}
                />
            )}
        </ul>
    )
}