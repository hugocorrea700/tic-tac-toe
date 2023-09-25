const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.json());

// Inicialize o estado do jogo
let history = [Array(9).fill(null)];
let currentMove = 0;

app.post("/realizar-jogada", (req, res) => {
  const nextSquares = req.body.nextSquares;

  function validateMove(
    currentSquares,
    i,
    nextSquares,
    currentPlayer,
    xIsNext,
    currentMove
  ) {
    // Verificar se a posição está vazia
    if (nextSquares[i] !== null) {
      return false; // Posição já ocupada, jogada inválida
    }

    // Alternar entre jogadores (X e O)
    if (
      (currentPlayer === "X" && xIsNext === false) ||
      (currentPlayer === "O" && xIsNext === true)
    ) {
      return false; // Não é a vez do jogador atual, jogada inválida
    }

    // se o jogo já terminou (alguém venceu ou empatou)
    if (calculateWinner(nextSquares) || currentMove === 9) {
      return false; // O jogo já terminou
    }

    return true; // A jogada é válida
  }

  if (validateMove(nextSquares)) {
    history = [...history.slice(0, currentMove + 1), nextSquares];
    currentMove = history.length - 1;

    // Verifique a vitória ou empate aqui e envie uma resposta adequada
    const winner = calculateWinner(nextSquares);
    if (winner) {
      res.json({ winner, history });
    } else if (currentMove === 9) {
      res.json({ draw: true, history });
    } else {
      res.json({ history, currentMove });
    }
  } else {
    // A jogada é inválida; envie uma resposta de erro
    res.status(400).json({ error: "Jogada inválida" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Função de validação de jogada simples (adaptável para suas necessidades)
function validateMove(
  currentSquares,
  i,
  nextSquares,
  currentPlayer,
  xIsNext,
  currentMove
) {
  // Verificar se a posição está vazia
  if (nextSquares[i] !== null) {
    return false; // Posição já ocupada, jogada inválida
  }

  // Alternar entre jogadores (X e O)
  if (
    (currentPlayer === "X" && xIsNext === false) ||
    (currentPlayer === "O" && xIsNext === true)
  ) {
    return false; // Não é a vez do jogador atual, jogada inválida
  }

  // se o jogo já terminou (alguém venceu ou empatou)
  if (calculateWinner(nextSquares) || currentMove === 9) {
    return false; // O jogo já terminou
  }

  return true; // A jogada é válida
}

function calculateWinner(squares) {
  // Implemente a lógica de verificação de vitória aqui
  // Verifique se algum jogador ganhou e retorne o vencedor (X ou O) ou null se não houver vencedor.
  return null;
}
