import React from 'react';

import Channels from '../../components/Channels';
import Teams from '../../components/Teams';
import Header from '../../components/Header';
import Messages from '../../components/Messages';
import Input from '../../components/Input';
import Layout from '../../components/Layout';

export default () => (
	<Layout>
		<Teams>Teams</Teams>
		<Channels>Channels</Channels>
		<Header>Header</Header>
		<Messages>
			<ul className='message-list'>
				<li />
				<li />
			</ul>
		</Messages>
		<Input>
			<input type='text' placeholder='CSS Grid Layout Module' />
		</Input>
	</Layout>
);
