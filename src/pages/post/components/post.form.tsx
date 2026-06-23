import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from '@mui/material';
import type { Post } from '../../../model/post';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAddPostMutation } from '../../../api/postApi/post.api';

function PostForm({
	open,
	handleClose,
	onFormSubmit,
}: {
	open: boolean;
	handleClose: () => void;
	onFormSubmit: (data: Post) => void;
}) {
	const [addPost] = useAddPostMutation();

	console.log('PostForm rendered');

	const schema = yup
		.object({
			title: yup
				.string()
				.required('title boş geçilemez')
				.max(20, 'en fazla 20 karakter olmalı'),
			body: yup
				.string()
				.required('body boş geçilemez')
				.max(100, 'en fazla 100 karakter olmalı'),
		})
		.required();

	// schema dan türetilen form tipleri için kullanılır.
	type PostForm = yup.InferType<typeof schema>;

	const {
		// watch, // form alanlarını izlemek için kullanılır
		reset, // form reset işlemi için kullanılır
		control, // MUI gibi third-party UI kütüphaneleri ile kullanmak için Controller kullanıyoruz
		handleSubmit, // form submit işlemi için kullanılır
		formState: { errors, isValid }, // form validasyon hataları burada tutulur
	} = useForm({
		resolver: yupResolver(schema),
	});

	//const title = watch('title'); // gerekmedikçe kullanmayalım render'a sebep olur
	// console.log('title value:', title);

	const onSubmit = async (data: PostForm) => {
		console.log('formData', data);
		onFormSubmit(data as Post);
		await addPost(data as Post);
		reset({ title: '', body: '' });
	};

	return (
		<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
			<DialogTitle>Yeni Kayıt</DialogTitle>

			<DialogContent>
				<Controller
					name="title"
					control={control}
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					render={({ field }: any) => (
						<TextField
							{...field}
							margin="dense"
							label="Title"
							fullWidth
							variant="outlined"
							error={!!errors.title}
							helperText={errors.title ? errors.title.message : ''}
						/>
					)}
				/>

				<Controller
					name="body"
					control={control}
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					render={({ field }: any) => (
						<TextField
							{...field}
							margin="dense"
							label="Body"
							fullWidth
							variant="outlined"
							error={!!errors.body}
							helperText={errors.body ? errors.body.message : ''}
						/>
					)}
				/>
			</DialogContent>

			<DialogActions>
				<Button
					variant="outlined"
					type="button"
					onClick={() => reset({ title: '', body: '' })}
					color="inherit"
				>
					Reset
				</Button>
				<Button
					disabled={!isValid}
					type="submit"
					onClick={handleSubmit(onSubmit)}
					variant="contained"
				>
					Kaydet
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default PostForm;
