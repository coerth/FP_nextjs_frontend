import { fetchCards as fetchSets } from '../../utils/fetchSets';

export default async function Page() {
    let sets = await fetchSets(10);

  return (
    <div>
      <h1>Cards</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Set URI</th>
          </tr>
        </thead>
        <tbody>
          {sets.map((set) => (
            <tr key={set.id}>
              <td>{set.set_id}</td>
              <td>{set.set_name}</td>
              <td>{set.set_uri}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}