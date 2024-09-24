package ch05.sec03;

public class ReferenceVariableCompareExample {
	public static void main(String[] args) {
		int[] arr1;	// 배열 변수 arr1 선언
		int[] arr2;	// 배열 변수 arr2 선언
		int[] arr3;	// 배열 변수 arr3 선언
		
		arr1 = new int[] { 1, 2, 3 };	// 배열 { 1, 2, 3 }을 생성하고 arr1 변수에 대입
		arr2 = new int[] { 1, 2, 3 };	// 배열 { 1, 2, 3 }을 생성하고 arr2 변수에 대입
		arr3 = arr2;					// 배열 변수 arr2의 값을 배열 변수 arr3에 대입
		
		System.out.println(arr1 == arr2);	// arr1과 arr2 변수가 같은 배열을 참조하고 있는지 검사
		// arr1과 arr2는 저장 항목은 같지만 서로 다른 배열 객체로 생성되므로 arr1과 arr2 변수에 대입되는 번지는 다
		System.out.println(arr2 == arr3);	// arr2과 arr3 변수가 같은 배열을 참조하고 있는지 검사
		// arr2과 arr3는 동일한 번지를 가지며 같은 배열을 참
	}
}
