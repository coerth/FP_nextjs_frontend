import { fetchCards } from '../../utils/fetchCards';

export default async function Page() {
    let cards = await fetchCards(10);

  return (
    <div>
      <h1>Cards</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Artist</th>
            <th>Arena ID</th>
            <th>Scryfall Set URI</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card) => (
            <tr key={card.id}>
              <td>{card.id}</td>
              <td>{card.artist}</td>
              <td>{card.arena_id}</td>
              <td>
                <a href={card.scryfall_set_uri} target="_blank" rel="noopener noreferrer">
                  Link
                </a>
              </td>
              <td>
                <img src={card.image_uris.small} alt={card.artist} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}