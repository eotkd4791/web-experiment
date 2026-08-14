import { Link } from 'react-router-dom';

export function RerenderHome() {
  return (
    <div>
      <h1>홈</h1>
      <ol>
        <li>
          <Link to="/first">First</Link>
        </li>
        <li>
          <Link to="/second">Second</Link>
        </li>
      </ol>
    </div>
  );
}
