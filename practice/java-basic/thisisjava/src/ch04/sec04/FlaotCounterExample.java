package ch04.sec04;

public class FlaotCounterExample {
	public static void main(String[] args) {
		for(float x = 0.1f; x <= 1; x += 0.1f) {
			System.out.println(x);
			// 부동 소수점 방식의 float 타입은 연산 과정에서 정확히 0.1을 표현하지 못함
			// 때문에 증감식에서 x에 더해지는 실제 값은 0.1 보다 약간 클 수 있음
			// 따라서 최종 반복 횟수는 9번이 
		}
	}

}
