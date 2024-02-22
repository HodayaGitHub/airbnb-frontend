import { StayPreview } from "./StayPreview.jsx"

export function StayList({ stays, onRemoveStay, params }) {
    return (
        <ul className="stay-list">
            {stays.map(stay =>
                <StayPreview
                    params={params}
                    key={stay._id}
                    stay={stay}
                    onRemoveStay={onRemoveStay}
                />
            )}
        </ul>
    )
}