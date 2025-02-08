// Continuação do código anterior
        </select>
        <button onClick={handleCreateKey}>Criar Nova Chave</button>
      </div>

      <div className="api-keys-list">
        <table>
          <thead>
            <tr>
              <th>Chave</th>
              <th>Permissões</th>
              <th>Criada em</th>
              <th>Último Uso</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {apiKeys.map((key) => (
              <tr key={key.id}>
                <td>{key.key}</td>
                <td>{key.permissions}</td>
                <td>{new Date(key.created_at).toLocaleString()}</td>
                <td>
                  {key.last_used
                    ? new Date(key.last_used).toLocaleString()
                    : 'Nunca'}
                </td>
                <td>
                  <button onClick={() => handleRevokeKey(key.id)}>
                    Revogar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
