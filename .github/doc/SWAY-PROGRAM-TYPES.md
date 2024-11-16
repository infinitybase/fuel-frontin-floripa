# Sway program types

## Smart Contracts
- **Definição**: Programas implantados na blockchain que automatizam ações baseadas em condições predefinidas.
- **Características**: Acessam armazenamento persistente, suportam lógica complexa e precisam ser implantados antes de uso.
- **Execução**: Rodam como parte de transações e permitem interações externas e atualizações de estado.
- **Usos**: Gerenciamento de ativos digitais, automação financeira e criação de dApps.

```rust
contract;

storage {
    counter: u64 = 0,
}

abi Counter {
    #[storage(read, write)]
    fn increment();

    #[storage(read)]
    fn count() -> u64;
}

impl Counter for Contract {
    #[storage(read)]
    fn count() -> u64 {
        storage.counter.read()
    }

    #[storage(read, write)]
    fn increment() {
        let incremented = storage.counter.read() + 1;
        storage.counter.write(incremented);
    }
}
```

## Predicates

- **Definição de Predicates**: São programas que retornam um valor booleano e representam a propriedade de um recurso, sendo executados para verificar se uma condição é atendida.
- Não têm acesso ao armazenamento de contratos e não precisam ser implantados na blockchain. Em vez disso, existem durante uma transação.
- Predicados podem verificar as entradas e saídas de transações, mas não podem ler ou escrever memória.
- São usados para liberar recursos, como moedas, com base em condições específicas.

```rust
predicate;

use std::{outputs::{output_asset_to}};

configurable {
    RECEIVER: Address = Address::from(0x09c0b2d1a486c439a87bcba6b46a7a1a23f3897cc83a94521a96da5c23bc58db),
}

fn main() -> bool {
     let to = match output_asset_to(0) {
        Some(address) => address,
        None => return false,
    };

    (to == RECEIVER)
}
```
