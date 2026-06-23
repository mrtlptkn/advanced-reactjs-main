// Backend Request veya Response Dto karşılıkları için kullanılabilir

export interface Post {
	id: number;
	title: string;
	body: string;
	userId: number;
}

// type ButtonType = 'primary' | 'secondary' | 'danger';

// type SaveButtonType = { label:string & ButtonType };

// export interface Button {
//     label: string;
//     type: ButtonType;
//     onClick: () => void;
// }
