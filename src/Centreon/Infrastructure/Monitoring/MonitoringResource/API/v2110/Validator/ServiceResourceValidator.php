<?php

/*
 * Copyright 2005 - 2020 Centreon (https://www.centreon.com/)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * For more information : contact@centreon.com
 *
 */
declare(strict_types=1);

namespace Centreon\Infrastructure\Monitoring\MonitoringResource\API\v2110\Validator;

use Centreon\Domain\Common\Assertion\Assertion;
use Centreon\Infrastructure\Monitoring\MonitoringResource\API\v2110\Validator\Interfaces\MonitoringResourceValidatorInterface;

class ServiceResourceValidator implements MonitoringResourceValidatorInterface
{
    /**
     * @var string $type Type of Monitoring Resource
     */
    private const TYPE = 'service';

    /**
     * @inheritDoc
     */
    public function validateOrFail(array $monitoringResource): void
    {
        Assertion::keyExists($monitoringResource, 'id', 'resource::id');
        Assertion::integer($monitoringResource['id'], 'resource::id');

        Assertion::keyExists($monitoringResource, 'name', 'resource::name');
        Assertion::string($monitoringResource['name'], 'resource::name');

        Assertion::keyExists($monitoringResource, 'type', 'resource::type');
        Assertion::eq($monitoringResource['type'], 'service', 'resource::type');

        Assertion::keyExists($monitoringResource, 'parent', 'resource::parent');
        Assertion::notNull($monitoringResource['parent'], 'resource::parent');

        Assertion::keyExists($monitoringResource['parent'], 'id', 'resource::parent::id');
        Assertion::integer($monitoringResource['parent']['id'], 'resource::parent::id');

        Assertion::keyExists($monitoringResource['parent'], 'name', 'resource::parent::name');
        Assertion::string($monitoringResource['parent']['name'], 'resource::parent::name');

        Assertion::keyExists($monitoringResource['parent'], 'type', 'resource::parent::type');
        Assertion::eq($monitoringResource['parent']['type'], 'host', 'resource::parent::type');
    }

    public function isValidFor(string $type): bool
    {
        return $type === self::TYPE;
    }
}