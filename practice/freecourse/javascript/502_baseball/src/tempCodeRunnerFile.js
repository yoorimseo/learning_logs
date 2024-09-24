while (result !== '0볼 3스트라이크') {
      result = referee.compare(COMPUTER, this.askNumbers());
      MissionUtils.Console.print(result);
    }